package com.example.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.v1.core.Table

object UsersTable: Table("users"){
    val id = varchar("id",36);
}

@Serializable
data class User (
    val id: String,
    val username: String,
    val password: String,
    )



