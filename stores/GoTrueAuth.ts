import GoTrue from 'gotrue-js'

const auth = new GoTrue({
  APIUrl: 'https://momentumfitness.netlify.app/.netlify/identity',
  audience: "",
  setCookie: true,
})

export default auth;
