import React from "react";
import nookies from 'nookies';
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSidebar(props) {
  return (
      <Box as="aside">
        <img style={{ borderRadius: "8px" }} src={`https://github.com/${props.user}.png`}/>
        <hr/>
        <p>
          <a className="boxLink" href={`https://github.com/${props.user}`}>
            @{props.user}
          </a>
        </p>
        <hr/>

        <AlurakutProfileSidebarMenuDefault />

      </Box>      
    )
}

export default function Home(props) {

  const githubUser = props.githubUser; 
  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    'rochacbruno',
    'csev'
  ];

  const [communities, setCommunity] = React.useState([]);

  React.useEffect(() => {
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': '7256220e28733339372e65d445b157',
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({"query": `query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`})
    })
    .then(response => response.json())
    .then((fullResponse) => {
      const communityData = fullResponse.data.allCommunities;
      setCommunity(communityData);
  })
}, [])
  

  const [followers, setFollowers] = React.useState([]);

    React.useEffect(() => {
      fetch("https://api.github.com/users/LucasLBF/followers")
      .then(response => response.json())
      .then(fullResponse => {
      setFollowers(fullResponse);
    });
    }, [])

  const [following, setFollowing] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.github.com/users/LucasLBF/following")
    .then(response => response.json())
    .then(fullResponse => {
      setFollowing(fullResponse);
    });
  }, [])

  function RenderBoxContents(props) {
    if (props.className === 'communities') {    
    return (
      <ProfileRelationsBoxWrapper>
        <h2 className="smallTitle">
          {props.title} ({props.items.length})
        </h2>
        <ul>
            {props.items.slice(0, 6).map((item) => {
            return (
              <li key={item.id}>
                <a href={`/communities/${item.id}`}>
                  <img src={item.imageUrl}/>
                  <span>{item.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
        <hr/>
        <a href="" className="boxLink">Ver todos</a>
      </ProfileRelationsBoxWrapper>
    )} else if (props.className === 'followers' || props.className === 'following') {
      return (
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {props.title} ({props.items.length})
          </h2>
          <ul>
            {props.items.slice(0, 6).map((user) => {
              return (
                <li key={user.id}>
                  <a href={`https://github.com/${user.login}`} target="_blank">
                    <img src={user.avatar_url}/>
                      <span>{user.login}</span>
                  </a>
                </li>
              )
            })}
          </ul>
          <hr/>
          <a href="" className="boxLink">Ver todos</a>
        </ProfileRelationsBoxWrapper>
      )
    }
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar user={githubUser}/>
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">
            Bem-Vindo(a), {githubUser}
            </h1>
            <OrkutNostalgicIconSet recados={16} fotos={22} videos={4} fas={4} mensagens={14} confiavel={3} legal={3} sexy={3} />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newComunity = new FormData(e.target);
              const communityObj = {
                title: newComunity.get('title'),
                imageUrl: newComunity.get('image'),
                creatorSlug: githubUser
              }

              fetch('/api/communities', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json' 
                },
                body: JSON.stringify(communityObj)
              })
              .then(async response => {
                const fullResponse = await response.json();
                console.log(fullResponse.newRegister);
                const newCommunity = fullResponse.newRegister;
                const updatedCommunities = [newCommunity, ...communities];
                setCommunity(updatedCommunities);
  
              })
            }}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" 
                name="title" 
                aria-label="Qual vai ser o nome da sua comunidade?"
                type="text"
                />
              </div>
              <div>
                <input placeholder="Coloque uma URL para usarmos de capa" 
                name="image" 
                aria-label="Coloque uma URL para usarmos de capa"
                type="text"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>      
        </div>

        <div className="profileRelationsArea" style={{ gridArea: "profileRelationsArea" }}>
            <RenderBoxContents items= {communities} className="communities" title="Comunidades" />
            <RenderBoxContents items={followers} className="followers" title="Seguidores" />
            <RenderBoxContents items={following} className="following" title="Seguindo" />
            {/* <RenderBoxContents items= {favoritePeople} content="Pessoas da Comunidade" /> */}
        </div>           
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const { githubUser } = jwt.decode(token);

  const {isAuthenticated} = await fetch('http://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
  .then(response => response.json())

  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return {
    props: { githubUser }
  }
}