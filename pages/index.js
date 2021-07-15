import React from "react";
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

export default function Home() {
  const [communities, setCommunity] = React.useState([{
    id: 5465468213464315,
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }, 
  {
    id: 6564356845535,
    title: 'Alura Stars',
    image: 'data:image/jpeg;base64,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',
  },
  {
    id: 657968541358613,
    title: 'JavaScript',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png'
  },
  {
    id: 46546519845616,
    title: 'HTTP Status Dogs',
    image: 'https://httpstatusdogs.com/img/200.jpg'
  },
  {
    id: 46435481816618,
    title: 'Queria sorvete, mas era feijão',
    image: 'https://img10.orkut.br.com/community/82249596589df8f1d427421aec21cd12.jpg'
  },
  {
    id: 651861561610,
    title: 'React',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png'
  },
  {
    id: 6546156816,
    title: 'EU AMO CHOCOLATE!',
    image: 'https://img10.orkut.br.com/community/1ae6440ef13da409ef42132a76814b33.jpg'
  }]);
  const githubUser = "LucasLBF"; 
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
                <a href={`/communities/${item.title}`}>
                  <img src={item.image}/>
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
              console.log(user);
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
            Bem-Vindo, Lucas
            </h1>
            <OrkutNostalgicIconSet recados={16} fotos={22} videos={4} fas={4} mensagens={14} confiavel={3} legal={3} sexy={3} />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const newComunity = new FormData(e.target);
              const communityObj = {
                id: new Date().toISOString,
                title: newComunity.get('title'),
                image: newComunity.get('image')
              }
              const updatedCommunities = [...communities, communityObj];
              setCommunity(updatedCommunities);
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