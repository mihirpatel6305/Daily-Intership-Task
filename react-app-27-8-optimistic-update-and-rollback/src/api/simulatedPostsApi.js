let posts = [];

function simulateNetworkCall(response) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldFail = Math.random() < 0.1;
      if (shouldFail) reject(new Error("Network Error!"));
      else resolve(response);
    }, 1000 + Math.random() * 1000);
  });
}

export const fetchPosts = () => simulateNetworkCall([...posts]);

export const addPost = (newPost) => {
  const post = { ...newPost, id: Date.now() };
  return simulateNetworkCall(post).then((res) => {
    posts.push(res);
    return res;
  });
};

export const updatePost = ({ id, editedData }) => {
  return simulateNetworkCall({ ...editedData }).then((updated) => {
    posts = posts.map((p) => (p.id === id ? { ...p, ...updated } : p));
    return updated;
  });
};

export const deletePost = (id) => {
  return simulateNetworkCall({ success: true }).then(() => {
    posts = posts.filter((p) => p.id !== id);
    return { success: true };
  });
};
