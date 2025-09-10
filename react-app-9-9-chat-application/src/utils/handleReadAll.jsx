function handleReadAll(queryClient) {
  queryClient.setQueryData(["messages"], (prev = []) => {
    return prev.map((msg) => {
      if (!msg?.read) {
        return { ...msg, read: true };
      }
      return msg;
    });
  });
}

export default handleReadAll;
