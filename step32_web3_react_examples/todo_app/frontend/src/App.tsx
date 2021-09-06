import React, { useEffect, useRef, useState } from "react";
import { TODO_LIST_ADDRESS } from "./config";
import TODO_LIST_ABI from './abi/todoList.json'
import { TodoList } from '../types/web3-v1-contracts/todoList'
import "./App.css";
import Web3 from "web3";
import { Button, Form } from "react-bootstrap";
declare let window: any;

function App() {
  const [account, setAccount] = useState("");
  const [tasks, setTasks] = useState<any>([]);
  const [todoListContract, setTodoListContract] = useState<TodoList>();
  const [loading, setLoading] = useState(false);

  const taskValue = useRef<HTMLInputElement>(null);
  const checkbox = useRef<HTMLInputElement>(null);


  const createTask = (content: string) => {
    setLoading(true);
    todoListContract!.methods
      .createTask(content)
      .send({ from: account })
      .once("receipt", (receipt: any) => {
        console.log("receipt :", receipt);
        getTasks().then(() => {
          setLoading(false);
        });
      });
  };

  const taskCompleted = (taskId: string) => {
    setLoading(true);
    todoListContract!.methods
      .toggleCompleted(taskId)
      .send({ from: account })
      .once("receipt", (receipt: any) => {
        console.log(receipt);
        getTasks().then(() => {
          setLoading(false);
        });
      });
  };

  const getTasks = async (contract?: any) => {
    setLoading(true);
    const smartContract =
      todoListContract === undefined ? contract : todoListContract;
    /* fetch the total number of tasks stored in our ganache blockchain */
    const taskCount = await smartContract.methods.taskCount().call();

    /* get all tasks from blockchain */
    let userTasks = [];
    for (let i = 1; i <= taskCount; i++) {
      const task = await smartContract.methods.tasks(i).call();
      userTasks.push(task);
    }
    setTasks(userTasks);
    setLoading(false);
  };

  useEffect(() => {
    const loadBlockchainData = async () => {
      /* this is to ensure metamask is installed in browser */
      if (window.ethereum !== undefined) {
        /* metamask would try to connect with the Dapp running in yourbrowser */
        await window.ethereum.enable();

        /* connect to metamask's localhost:8545 network */
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

        /* initialize our contract with contract address(copy this from ganache) and contract's ABI */
        const todoList = ((new web3.eth.Contract(TODO_LIST_ABI as any, TODO_LIST_ADDRESS)) as any) as TodoList;
        setTodoListContract(todoList);

        /* get user's wallet address from metamask wallet */
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        await getTasks(todoList);
      } else {
        alert("Install metamask");
      }
    };

    loadBlockchainData();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            {loading ? (
              <div className="text-center">
                <p className="text-center">Loading...</p>
              </div>
            ) : (
              <div id="content">
                <Form
                  onSubmit={(event) => {
                    event.preventDefault();
                    console.log(taskValue.current?.value);

                    createTask(taskValue.current?.value!);
                  }}
                >
                  <Form.Group
                    className="my-3 flex flex-wrap"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Task Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Add Task..."
                      ref={taskValue}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
                <ul id="taskList" className="list-unstyled">
                  {tasks.map((task: any, key: number) => {
                    return (
                      <div
                        className={`taskTemplate checkbox ${
                          task.completed ? "completedTaskList" : ""
                        }`}
                        key={key}
                      >
                        <label>
                          <input
                            type="checkbox"
                            name={task.id}
                            defaultChecked={task.completed}
                            ref={checkbox}
                            onClick={(event) => {
                              taskCompleted(task.id);
                            }}
                          />
                          <span className="content text-black px-3">
                            {task.content}
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
