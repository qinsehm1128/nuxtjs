export default defineEventHandler((event) => {
  return {
    message: 'Hello from Nuxt backend!',
    timestamp: new Date().toISOString()
  }
})
