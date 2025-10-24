<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h1>Nuxt.js 全栈示例</h1>
    
    <div style="margin-bottom: 30px;">
      <h2>1. Hello API</h2>
      <button @click="fetchHello" style="padding: 8px 16px; cursor: pointer;">调用 /api/hello</button>
      <pre v-if="helloData" style="background: #f5f5f5; padding: 10px; margin-top: 10px;">{{ helloData }}</pre>
    </div>

    <div style="margin-bottom: 30px;">
      <h2>2. 用户列表 API</h2>
      <button @click="fetchUsers" style="padding: 8px 16px; cursor: pointer;">调用 /api/users</button>
      <div v-if="users" style="margin-top: 10px;">
        <div v-for="user in users" :key="user.id" style="padding: 10px; border: 1px solid #ddd; margin-bottom: 5px;">
          <strong>{{ user.name }}</strong> - {{ user.email }}
          <button @click="fetchUserById(user.id)" style="margin-left: 10px; padding: 4px 8px; cursor: pointer;">
            查看详情
          </button>
        </div>
      </div>
    </div>

    <div v-if="selectedUser" style="margin-bottom: 30px;">
      <h2>3. 用户详情</h2>
      <pre style="background: #f5f5f5; padding: 10px;">{{ selectedUser }}</pre>
    </div>

    <div style="margin-bottom: 30px; border-top: 2px solid #ccc; padding-top: 20px;">
      <h2>4. 创建用户 (POST 请求示例)</h2>
      <form @submit.prevent="createUser" style="max-width: 400px;">
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px;">姓名 *</label>
          <input 
            v-model="newUser.name" 
            type="text" 
            required
            style="width: 100%; padding: 8px; border: 1px solid #ddd;"
          />
        </div>
        
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px;">邮箱 *</label>
          <input 
            v-model="newUser.email" 
            type="email" 
            required
            style="width: 100%; padding: 8px; border: 1px solid #ddd;"
          />
        </div>
        
        <div style="margin-bottom: 10px;">
          <label style="display: block; margin-bottom: 5px;">年龄</label>
          <input 
            v-model.number="newUser.age" 
            type="number" 
            style="width: 100%; padding: 8px; border: 1px solid #ddd;"
          />
        </div>
        
        <button 
          type="submit" 
          :disabled="isCreating"
          style="padding: 10px 20px; cursor: pointer; background: #42b883; color: white; border: none; border-radius: 4px;"
        >
          {{ isCreating ? '创建中...' : '创建用户' }}
        </button>
      </form>
      
      <div v-if="createResult" style="margin-top: 15px; padding: 10px; border-radius: 4px;" :style="{
        background: createResult.success ? '#d4edda' : '#f8d7da',
        color: createResult.success ? '#155724' : '#721c24'
      }">
        <strong>{{ createResult.message }}</strong>
        <pre v-if="createResult.data" style="margin-top: 10px; background: white; padding: 10px; color: black;">{{ createResult.data }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
const helloData = ref(null)
const users = ref(null)
const selectedUser = ref(null)

const newUser = ref({
  name: '',
  email: '',
  age: null
})
const isCreating = ref(false)
const createResult = ref(null)

const fetchHello = async () => {
  const data = await $fetch('/api/hello')
  helloData.value = data
}

const fetchUsers = async () => {
  const response = await $fetch('/api/users')
  users.value = response.data
}

const fetchUserById = async (id) => {
  const response = await $fetch(`/api/users/${id}`)
  selectedUser.value = response.data
}

const createUser = async () => {
  createResult.value = null
  isCreating.value = true
  
  try {
    const response = await $fetch('/api/users/create', {
      method: 'POST',
      body: {
        name: newUser.value.name,
        email: newUser.value.email,
        age: newUser.value.age
      }
    })
    
    createResult.value = response
    
    // 清空表单
    newUser.value = {
      name: '',
      email: '',
      age: null
    }
  } catch (error) {
    createResult.value = {
      success: false,
      message: error.data?.statusMessage || error.message || '创建失败'
    }
  } finally {
    isCreating.value = false
  }
}
</script>
