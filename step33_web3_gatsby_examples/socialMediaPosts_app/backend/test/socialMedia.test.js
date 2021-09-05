const SocialMedia = artifacts.require('../contracts/socialMedia.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SocialMedia', ([ user1, user2]) => {
  let socialMedia

  before(async () => {
    socialMedia = await SocialMedia.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await socialMedia.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

  })

  describe('posts', async () => {
    let result, postCount

    before(async () => {
      result = await socialMedia.createPost('helloWorld', { from: user1 })
      postCount = await socialMedia.postCount()
    })

    it('creates post', async () => {
      // SUCCESS
      assert.equal(postCount, 1)
       const event = result.logs[0].args
       assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
       assert.equal(event.text, 'helloWorld', 'text is correct')
       assert.equal(event.postedBy, user1, 'postedBy is correct')

       // FAILURE: post must have some text
       await socialMedia.createPost('', { from: user1 }).should.be.rejected;

    })


    
  })



  describe('comments', async () => {
    let result, comments, commentCount

    before(async () => {
      //product = await socialMedia.createPost('helloWorld', { from: user1 })
      result = await socialMedia.createComment('helloWorldComment',1, { from: user2 });
      comments = await socialMedia.comments(1,1);
      commentCount = await socialMedia.commentCount(1);

    })

    it('creates comment', async () => {
      // SUCCESS
       assert.equal(comments.id, 1)
       assert.equal(commentCount, 1)
       const event = result.logs[0].args
       assert.equal(event.text, 'helloWorldComment', 'text is correct')
       assert.equal(event.postedBy, user2, 'postedBy is correct')
       assert.equal(event.postId, 1, 'postId is correct')


       // FAILURE: comment must have some text
       await socialMedia.createComment('', 1, { from: user1 }).should.be.rejected;
       
       // FAILURE: comment must have a valid postId
       await socialMedia.createComment('helloWorldComment', 0, { from: user1 }).should.be.rejected;
       await socialMedia.createComment('helloWorldComment', 2, { from: user1 }).should.be.rejected;
    })


    
  })



})