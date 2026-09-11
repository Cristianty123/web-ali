package com.example.domain.port.driven

import com.example.domain.model.User

interface UserRepository {
    suspend fun findById(id: Int): User?
    suspend fun findByUsername(username: String): User?
    suspend fun save(user: User): User
    suspend fun delete(user: User)
}