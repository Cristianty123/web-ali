package com.example.domain.model

data class Task(
    val id: Int?,
    val title: String,
    val description: String?,
    val priority: Priority,
    val state: State,
    val userId: Int
)