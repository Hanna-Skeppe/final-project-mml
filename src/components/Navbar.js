import React from "react";
import { Link } from 'react-router-dom'
import { Searchbar } from './Searchbar'
import { SearchUser } from './SearchUser'
import { Logout } from './Logout'
import { Hamburger } from 'components/Hamburger'
import { PopoverLogin } from 'components/PopoverLogin'
import { PopoverUserSearch } from 'components/PopoverUserSearch'
import {
  HeaderTitle, HeaderStartContainer, NavRightContainer,
  UserNameNav, MainStartContainer, SubNavbar, WatchListLink
} from "./Styling";
import styled from 'styled-components/macro'
import { useSelector, useDispatch } from 'react-redux'
import { ui } from '../reducers/ui'

export const Navbar = (props) => {
  // const [errorMessage, setErrorMessage] = useState("");

  const accessToken = useSelector((state) => state.users.accessToken)
  const userName = useSelector((state) => state.users.userName)
  const userId = useSelector((state) => state.users.userId)
  const selectedTab = useSelector((state) => state.ui.tab)

  const dispatch = useDispatch()

  const handleTabChange = (tab) => {
    dispatch(ui.actions.setTab(tab))
  }

  return (
    <MainStartContainer>
      {/* <Hamburger /> */}
      <HeaderStartContainer>
        <HeaderTitle>
          <Link to={`/`}>movie </Link>
          <Link to={`/`}>match.</Link>
        </HeaderTitle>
        <Searchbar />
        <NavRightContainer>
          <Link to={`/users/${userId}/movies`}>
            <UserNameNav>{userName}</UserNameNav>
          </Link>
          {!accessToken &&
            <PopoverLogin />
          }
          {accessToken &&
            <Logout />
          }
        </NavRightContainer>
      </HeaderStartContainer>
      <SubNavbar>
        <Link to="/" onClick={() => handleTabChange("movies")}>
          <WatchListLink>MOVIES</WatchListLink>
        </Link>

        <Link to="/users/:id/movies" onClick={() => handleTabChange("watch")}>
          <WatchListLink>Watchlist</WatchListLink>
        </Link>
        <Link to="/users/:id/movies" onClick={() => handleTabChange("rated")}>
          <WatchListLink>All rated</WatchListLink>
        </Link>

        <Link to="/users/:id/movies" onClick={() => handleTabChange("users")}>
          <WatchListLink>Other users</WatchListLink>
        </Link>
        <PopoverUserSearch />
      </SubNavbar>
    </MainStartContainer>
  )
}