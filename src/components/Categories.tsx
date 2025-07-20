import { Todo } from "@/types"
import { Tabs } from "@chakra-ui/react"
import { FaList } from "react-icons/fa"
import { MdOutlineIncompleteCircle, MdOutlineNotificationsActive } from "react-icons/md"
import TodoItem from "./TodoItem"
import { useMemo } from "react"

type Props = {
   todos: Todo[]
}

export default function Categories({ todos }: Props) {
   const activeTodos = useMemo(() => todos.filter((todo) => !todo.isCompleted), [todos])
   const completedTodos = useMemo(() => todos.filter((todo) => todo.isCompleted), [todos])
   const editedTodos = useMemo(() => todos.filter((todo) => todo.isEdited), [todos])

   return (
      <Tabs.Root defaultValue="all" variant="plain">
         <Tabs.List bg="bg.muted" rounded="l3" p="1" gap={2}>
            <Tabs.Trigger value="all" p={6}>
               <FaList />
               All {`(${todos.length})`}
            </Tabs.Trigger>
            <Tabs.Trigger value="active" p={6}>
               <MdOutlineNotificationsActive />
               Active {`(${activeTodos.length})`}
            </Tabs.Trigger>
            <Tabs.Trigger value="completed" p={6}>
               <MdOutlineIncompleteCircle />
               Completed {`(${completedTodos.length})`}
            </Tabs.Trigger>
            <Tabs.Trigger value="edited" p={6}>
               <MdOutlineIncompleteCircle />
               Edited {`(${editedTodos.length})`}
            </Tabs.Trigger>
            <Tabs.Indicator rounded="l2" />
         </Tabs.List>
         <Tabs.Content value="all">
            {todos.map((todo) => (
               <TodoItem key={todo.id} todo={todo} />
            ))}
         </Tabs.Content>
         <Tabs.Content value="active">
            {activeTodos.map((todo) => (
               <TodoItem key={todo.id} todo={todo} />
            ))}
         </Tabs.Content>
         <Tabs.Content value="completed">
            {completedTodos.map((todo) => (
               <TodoItem key={todo.id} todo={todo} />
            ))}
         </Tabs.Content>
         <Tabs.Content value="edited">
            {editedTodos.map((todo) => (
               <TodoItem key={todo.id} todo={todo} />
            ))}
         </Tabs.Content>
      </Tabs.Root>
   )
}
