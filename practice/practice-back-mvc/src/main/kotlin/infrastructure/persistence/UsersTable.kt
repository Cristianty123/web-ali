package com.example.infrastructure.persistence

import org.jetbrains.exposed.v1.core.Table

object UsersTable: Table("users"){
    val id = integer("id").autoIncrement()
    val username = varchar("username", 50).uniqueIndex()
    val email = varchar("email",100).uniqueIndex()
    val passwordHash = varchar("password_hash", 255)

    override val primaryKey = PrimaryKey(id, name = "PK_Users_Id")
}



