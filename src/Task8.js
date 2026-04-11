import { useState, useEffect } from 'react';
function Selector({SelectorId, onSelect}) {
    return (
        <div style={{display:"flex", gap:"8px", marginBottom:"16px"}}>
            {[1,2,3,4,5].map((id) => (
                <button 
                    key={id}
                    onClick={() => onSelect(id)}
                    style={{
                        padding:"8px 16px",
                        background:SelectorId === id ? "#4f46e5" : "#e5e7eb",
                        color: SelectorId === id ? "white" : "black",
                        borderRadius: "6px",
                        cursor: "pointer",
                    }}
                > 
                ID {id}
                </button>
            ))}
        </div>
    );
}

function UserProfile({userId}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUser(null);
        setLoading(true);

        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
            setUser(data);
            setLoading(false);
        });
    }, [userId]);
    if(loading) return <p>Загрузка пользователя {userId}...</p>
    return (
        <div style={{border: "1px solid #e5e7eb", padding: "16px", borderRadius: "8px"}}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
            <p>{user.email}</p>
            <p>{user.website}</p>
        </div>
    )
}

function Task8() {
    const [selectedId, setSelectedId] = useState(1);
    return (
        <div>
            <Selector selectedId={selectedId} onSelect={setSelectedId}/>
            <UserProfile userId={selectedId}/>
        </div>
    );
}
export default Task8;