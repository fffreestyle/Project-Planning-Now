import React from 'react'

type User = {
  name: string
}

interface Props {
  user: User
}

const UserPage = (props: Props) => {
  const { user } = props

  return <div>{user.name}</div>
}

export default UserPage
