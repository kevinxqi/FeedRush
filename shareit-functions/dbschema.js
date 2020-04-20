let db = {
  users: [
    {
      userId: "dh23ggj59334nkd",
      email: "user@gmail.com",
      handle: "user",
      createdAt: "2020-03-18T23:38:31.796Z",
      imageUrl: "image/dkajbfddsk/sakasjd",
      bio: "Hello, my name is kevin nice to meet you",
      website: "https://user.com",
      location: "London, UK"
    }
  ],

  posts: [
    {
      userHandle: "user",
      body: "this is the scream body",
      createdAt: "2020-03-18T21:41:16.080Z",
      likeCount: 5,
      commentCount: 2
    }
  ],

  comments: [
    {
      userHandle: "user",
      postId: "asdndlsfnlksdnfklsd",
      body: "nice one mate!",
      createdAt: "2020-03-18T23:38:31.796Z"
    }
  ],

  notifications: [
    {
      recipient: "user",
      sender: "john",
      read: "true | false",
      postId: "asdklakjfslkdjaslkdjaksl",
      type: "like | comment",
      createdAt: "2020-03-18T23:38:31.796Z"
    }
  ]
};

const userDetails = {
  // Redux data
  credentials: {
    userId: "N43KJSH43KJHRW3JD3NDS3",
    email: "user@gmail.com",
    handle: "user",
    createdAt: "2020-03-18T23:38:31.796Z",
    imageUrl: "image/dkajbfddsk/sakasjd",
    bio: "Hello, my name is kevin nice to meet you",
    website: "https://user.com",
    location: "London, UK"
  },

  // All the posts liked by given user
  likes: [
    {
      userHandle: "user",
      postId: "hh707oWgWucVzGGbHH2pa"
    },
    {
      userHandle: "user",
      postId: "3IOnFoQexRcofs60BX0sf"
    }
  ]
};
