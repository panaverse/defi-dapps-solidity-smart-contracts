// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SocialMedia {

 uint public postCount = 0;

mapping(uint => socialMediaPost) public posts;
mapping(uint => uint) public commentCount;
mapping(uint => mapping(uint => socialMediaComment)) public comments;


   struct socialMediaPost {
        uint id;
        string text;
        address postedBy;
    }

       struct socialMediaComment {
        uint id;
        string text;
        address postedBy;
        uint postId;
    }

       event postCreated(
        uint id,
        string text,
        address postedBy
    );

         event commentCreated(
      uint id,
        string text,
        address postedBy,
        uint postId
    );



function createPost (string memory _text ) public {

    require(bytes(_text).length > 0);

    postCount++;

    posts[postCount] = socialMediaPost(postCount,_text,msg.sender);
    emit postCreated(postCount, _text, msg.sender);

    
}


function createComment (string memory _text,uint _postId) public {

    require(bytes(_text).length > 0);


    require(_postId > 0 && _postId <= postCount);


    commentCount[_postId]++;

    comments[_postId][commentCount[_postId]] = socialMediaComment(commentCount[_postId],_text,msg.sender,_postId);
    emit commentCreated(commentCount[_postId], _text, msg.sender, _postId);
    
    
}



}
