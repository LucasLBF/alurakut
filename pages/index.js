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
    title: 'Tenho medo da Véia Quaker!',
    image: 'https://img10.orkut.br.com/community/3b860ff2a931fc79ba0de8aab1ef17de.jpg',
  },
  {
    id: 657968541358613,
    title: 'Sou legal, não estou te dando mole',
    image: 'https://img10.orkut.br.com/community/c234097b9bb574eeeaecdbf0266a19b6.jpg'
  },
  {
    id: 46546519845616,
    title: 'Eu nunca morri na minha vida!',
    image: 'https://img10.orkut.br.com/community/815617765e671c18b30592.81748533_f936bd2e36287ae53d89ce27d36f663e.jpg'
  },
  {
    id: 46435481816618,
    title: 'Queria sorvete, mas era feijão',
    image: 'https://img10.orkut.br.com/community/c54e54e5db93fcfd279da011f95e019f.jpg'
  },
  {
    id: 651861561610,
    title: 'Cabras não tem muitas ambições',
    image: 'https://img10.orkut.br.com/community/99265afeff3b5c002ecf9e29506e015b.png'
  }]);
  const githubUser = "LucasLBF"; 
  const favoritePeople = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ];

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
            Bem-Vindo(a)
            </h1>
            <OrkutNostalgicIconSet recados={16} fotos={22} confiavel={3} legal={3} sexy={3} />
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({communities.length})
            </h2>
            <ul>
                {communities.map((community, index) => {
                  if (index < 6) {
                    return (
                      <li key={community.id}>
                        <a href={`/communities/${community.title}`}>
                          <img src={community.image} />
                          <span>{community.title}</span>
                        </a>
                      </li>
                    )
                  }
                })}
              </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoritePeople.length})
            </h2>
            <ul>
              {favoritePeople.map((person) => {
                return (
                  <li key={person}>
                    <a href={`https://github.com/${person}`}>
                      <img src={`https://github.com/${person}.png`} />
                      <span>{person}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </ProfileRelationsBoxWrapper>
        </div>           
      </MainGrid>
    </>
  )
}
