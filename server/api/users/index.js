export default defineEventHandler((event) => {
  // 模拟用户数据
  const users = [
    { id: 1, name: "Alice", email: "alice@example.com" },
    { id: 2, name: "Bob", email: "bob@example.com" },
    { id: 3, name: "Charlie", email: "charlie@example.com" },
  ];

  return {
    success: true,
    data: users,
  };
});
