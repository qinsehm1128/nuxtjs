export default defineEventHandler(async (event) => {
  // 获取请求体数据
  const body = await readBody(event)
  
  const { name, email, age } = body
  
  // 验证必填字段
  if (!name || !email) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Name and email are required'
    })
  }
  
  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }
  
  // 模拟保存到数据库
  const newUser = {
    id: Date.now(),
    name,
    email,
    age: age || 18,
    createdAt: new Date().toISOString()
  }
  
  // 模拟数据库延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  return {
    success: true,
    message: 'User created successfully',
    data: newUser
  }
})
