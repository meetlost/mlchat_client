/**
 * lib for Username Creation Box
 */

function isUsernameReady(): boolean
{
  return window.localStorage.getItem("username") ? true : false;
}

function getUsername(): string
{
  return window.localStorage.getItem("username") || "";
}

function setUsername(username: string): void
{
  window.localStorage.setItem("username", username);
}

export { isUsernameReady, getUsername, setUsername };
