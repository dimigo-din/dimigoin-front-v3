import React, { useEffect, useState } from 'react'

async function getClassInfo(): Promise<[number, number]> {
    return [1, 3]
}

export const Timeline: React.FC = () => {
    const [classInfo, setClassInfo] = useState<[number, number]>();
    useEffect(() => {
        getClassInfo().then(info => setClassInfo(() => info))
    }, [])
    return <div>
        네?
    </div>
}