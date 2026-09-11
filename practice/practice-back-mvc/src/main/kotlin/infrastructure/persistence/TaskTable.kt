package com.example.infrastructure.persistence

import com.example.domain.model.Priority
import com.example.domain.model.State
import org.jetbrains.exposed.v1.core.ReferenceOption
import org.jetbrains.exposed.v1.core.Table

object TaskTable : Table("task"){
    val id = integer("id").autoIncrement()
    val title = varchar("title", 150)
    val description = varchar("description",150).nullable()

    val priority = enumerationByName("priority",20, Priority::class).default(Priority.LOW)

    val state = enumerationByName("state",20, State::class).default(State.PENDING)

    val userId = integer ("user_id").references(UsersTable.id, onDelete = ReferenceOption.CASCADE)

    override val primaryKey = PrimaryKey(id, name="PK_Task_Id")

}