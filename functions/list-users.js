
exports.handler = async(event, context) => {
  console.log(context.clientContext)
  const { identity, user } = context.clientContext; 
  const usersURL = `${identity.url}/admin/users`;
  const userAuth = `Bearer ${identity.token}`
  console.log({userAuth})
  try {
    // Grab raw data all of users on site
    const users = await fetch(usersURL, {
      method: 'GET',
      headers: {
        Authorization: JSON.stringify(userAuth)
      }
    }).then(res => res.json())
    .then(data => {
      console.log({data})
      // return data.users
    })
    console.log({users})

    // // Only grab the emails and first / last names of users to return
    // let nameToEmails = []
    // users.forEach((u) => {
    //   // 1) Under the users field grab the first name and last name and combine into one string
    //   const name = u.user_metadata.full_name
    //   // 2) Also grab the email and map it to the name
    //   const email = u.email
    //   nameToEmails[name] = email
    // })
    // console.log({nameToEmails})
    return {
      statusCode: 201
    }
  } catch (err) {
    console.log({err})
    return {
      statusCode: 500
    }
  }
}