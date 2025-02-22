import { useState } from "react";
import { createUsers } from "./user";
import UserCard from "./userCard";

export default function Users() {
    const [users, setUsers] = useState(createUsers);

    return (
        <div>
            {users.map((user) => 
                <UserCard key={user.id} user={user} />
            )}
        </div>
    )
}