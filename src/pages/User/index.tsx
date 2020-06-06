import React from 'react'

type User = {
  name: string
}

interface IUserInfo {
  user: User
}

const UserPage = (props: IUserInfo) => {
  const { user } = props

  return <div>{user.name}</div>
}

export default UserPage
