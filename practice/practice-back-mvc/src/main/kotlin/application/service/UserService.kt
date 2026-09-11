package com.example.application.service

import com.example.domain.model.User
import com.example.domain.port.driven.UserRepository

class UserService(private val userRepository: UserRepository){

    suspend fun createUser(user: User){
        userRepository.save(user)
    }

    suspend fun deleteUser(user: User){
        userRepository.delete(user)
    }
}