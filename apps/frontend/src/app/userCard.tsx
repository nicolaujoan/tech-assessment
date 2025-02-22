import { User } from "./user";

export default function UserCard({ user }: { user: User }) {
    return <div>{user.name}</div>
}