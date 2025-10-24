export default defineEventHandler((event) => {
  const id = parseInt(getRouterParam(event, 'id'))
  
  // 模拟用户数据
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com', age: 28 },
    { id: 2, name: 'Bob', email: 'bob@example.com', age: 32 },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', age: 25 }
  ]
  
  const user = users.find(u => u.id === id)
  
  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    })
  }
  
  return {
    success: true,
    data: user
  }
})
