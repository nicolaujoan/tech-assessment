import { useState } from "react";
import { User, createUsers } from "./user";
import UserCard from "./userCard";
import { Virtuoso } from "react-virtuoso";

export default function Users() {
    const [users, setUsers] = useState(createUsers);

    return (
        <div>
            <Virtuoso 
                data={users} 
                itemContent={(_, user: User) => <UserCard user={user} />} 
                style={{height: 200}}
            />
        </div>
    )
}