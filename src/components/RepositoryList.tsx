import { useState, useEffect, useCallback, useMemo } from 'react';
import { RepositoryItem } from './RepositoryItem';
import { StarredItem } from './StarredItem';
import '../styles/repositories.scss';
import { RepositoryProfile } from './RepositoryProfile';

interface Repository {
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  fork: boolean;
  forks_count: number;
  archived: boolean;
  mirror_url: string;
}

interface Profile {
  login: string;
  name: string;
  bio: string;
  company: string;
  location: string;
  blog: string;
  avatar_url: string;
}

export function RepositoryList() {
  const GIT_USER = 'joiceramos';

  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repositoriesStarred, setRepositoriesStarred] = useState<Repository[]>([]);
  const [profile, setProfile] = useState<Profile[]>([]);
  const [menuRepositories, setMenuRepositories] = useState(true);
  const [menuStarred, setMenuStarred] = useState(false);
  const [widthScreen, setWidthScreen] = useState(false);
  const [busca, setBusca] = useState('');
  const [userLanguages, setUserLanguages] = useState<string[]>([]);
  const [userStarredLanguages, setUserStarredLanguages] = useState<string[]>([]);
  const [filteredLanguages, setFilteredLanguages] = useState<string[]>([]);
  const [filteredStarredLanguages, setFilteredStarredLanguages] = useState<string[]>([]);
  
  const [filterTypeSource, setFilterTypeSource] = useState(false);
  const [filterTypeFork, setFilterTypeFork] = useState(false);
  const [filterTypeArchived, setFilterTypeArchived] = useState(false);
  const [filterTypeMirror, setFilterTypeMirror] = useState(false);

  const reposFilter = useMemo(() => {
    let filteredRepositories = menuRepositories ? repositories : repositoriesStarred;
    
    //filter by language
    filteredRepositories = filteredRepositories.filter((repository) => {
      let languages = menuRepositories ? filteredLanguages : filteredStarredLanguages;
      return languages.length > 0 ? languages.includes(repository.language) : true
    });

    //filter by type
    filteredRepositories = filteredRepositories.filter((repository) => {
      if (!filterTypeSource && !filterTypeFork && !filterTypeArchived && !filterTypeMirror)
        return true;

      return (filterTypeSource && repository.fork === false) || 
            (filterTypeFork && repository.fork === true) || 
            (filterTypeArchived && repository.archived === true) || 
            (filterTypeMirror && repository.mirror_url !== null)
    });

    //filter by search
    filteredRepositories = filteredRepositories.filter((repository) => {
      if (!busca)
        return true;

      return repository.full_name.toLowerCase().search(busca) > 0
    });

    return filteredRepositories
  }, [
      repositories, 
      filteredLanguages, 
      filteredStarredLanguages, 
      filterTypeSource,
      filterTypeFork,
      filterTypeArchived,
      filterTypeMirror,
      busca,
      menuStarred,
    ]);


  useEffect(() => {
    fetch(`https://api.github.com/users/${GIT_USER}`)
      .then((response) => response.json())
      .then((data) => setProfile(data));

    fetch(`https://api.github.com/users/${GIT_USER}/repos`)
      .then(response => response.json())
      .then((data: Repository[]) => {
        setRepositories(data);
        let languages = [...new Set(data.map((repo: Repository) => repo.language))];
        languages = languages.filter(language => language);
        setUserLanguages(languages);
      });
      

    fetch(`https://api.github.com/users/${GIT_USER}/starred`)
      .then((response) => response.json())
      .then((data: Repository[]) => {
        setRepositoriesStarred(data);
        let languages = [...new Set(data.map((repo: Repository) => repo.language))];
        languages = languages.filter(language => language);
        setUserStarredLanguages(languages);
      });
  }, []);

  useEffect(() => {
    if (window?.innerWidth >= 744) {
      setWidthScreen(true);
    } else {
      setWidthScreen(false);
    }
  }, []);

  const handleRepositories = useCallback(() => {
    setMenuRepositories(true);
    setMenuStarred(false);
  }, []);

  const handleStarred = useCallback(() => {
    setMenuRepositories(false);
    setMenuStarred(true);
  }, []);

  const handleSetTypeVisible = useCallback(() => {
    const type = document.querySelector<HTMLElement>('.content-type');
    const language = document.querySelector<HTMLElement>('.content-language');
    if (language) {
      language.style.display = 'none';
    }
    if (type) {
      type.style.display = 'block';
      type.style.position = 'absolute';
    }

    
  }, []);

  const handleSetLanguageVisible = useCallback(() => {
    const language = document.querySelector<HTMLElement>('.content-language');
    const type = document.querySelector<HTMLElement>('.content-type');
    if (type) {
      type.style.display = 'none';
    }

    if (language) {
      language.style.display = 'block';
      language.style.position = 'absolute';
    }
    
  }, []);

  const handleSetHidden = useCallback(() => {
    const type = document.querySelector<HTMLElement>('.content-type');
    const language = document.querySelector<HTMLElement>('.content-language');
    if (type) {
      type.style.display = 'none';
    }

    if (language) {
      language.style.display = 'none';
    }
    
  }, []);

  return (
    <>
      <div className="header">
        <div>
          <svg width="124" height="30" viewBox="0 0 124 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_0_1)">
              <path d="M74.5893 22.5227H74.552C74.5688 22.5227 74.58 22.5414 74.5968 22.5433H74.608L74.5893 22.5246V22.5227ZM74.5968 22.5433C74.4232 22.5451 73.9864 22.6366 73.5253 22.6366C72.0693 22.6366 71.5653 21.9646 71.5653 21.0873V15.2427H74.5333C74.7013 15.2427 74.832 15.0934 74.832 14.8881V11.7147C74.832 11.5467 74.6827 11.3974 74.5333 11.3974H71.5653V7.45872C71.5653 7.30939 71.472 7.21606 71.304 7.21606H67.272C67.104 7.21606 67.0107 7.30939 67.0107 7.45872V11.5094C67.0107 11.5094 64.976 12.0134 64.8453 12.0321C64.696 12.0694 64.6027 12.2001 64.6027 12.3494V14.8881C64.6027 15.0934 64.752 15.2427 64.92 15.2427H66.992V21.3654C66.992 25.9201 70.1653 26.3867 72.3307 26.3867C73.32 26.3867 74.5147 26.0694 74.7013 25.9761C74.8133 25.9387 74.8693 25.8081 74.8693 25.6774V22.8774C74.8719 22.798 74.8458 22.7203 74.7957 22.6586C74.7457 22.5969 74.675 22.5553 74.5968 22.5414V22.5433ZM118.829 18.4347C118.829 15.0561 117.467 14.6081 116.029 14.7574C114.909 14.8321 114.013 15.3921 114.013 15.3921V21.9627C114.013 21.9627 114.928 22.5974 116.291 22.6347C118.213 22.6907 118.829 22.0001 118.829 18.4347ZM123.365 18.1361C123.365 24.5387 121.293 26.3681 117.672 26.3681C114.611 26.3681 112.968 24.8187 112.968 24.8187C112.968 24.8187 112.893 25.6774 112.8 25.7894C112.744 25.9014 112.651 25.9387 112.539 25.9387H109.776C109.589 25.9387 109.421 25.7894 109.421 25.6214L109.459 4.88272C109.459 4.71472 109.608 4.56539 109.776 4.56539H113.752C113.92 4.56539 114.069 4.71472 114.069 4.88272V11.9201C114.069 11.9201 115.6 10.9307 117.84 10.9307L117.821 10.8934C120.061 10.8934 123.365 11.7334 123.365 18.1361ZM107.088 11.3974H103.168C102.963 11.3974 102.851 11.5467 102.851 11.7521V21.9067C102.851 21.9067 101.824 22.6347 100.424 22.6347C99.024 22.6347 98.6133 22.0001 98.6133 20.6001V11.7334C98.6133 11.5654 98.464 11.4161 98.296 11.4161H94.3013C94.1333 11.4161 93.984 11.5654 93.984 11.7334V21.2721C93.984 25.3787 96.28 26.4054 99.4347 26.4054C102.029 26.4054 104.139 24.9681 104.139 24.9681C104.139 24.9681 104.232 25.6961 104.288 25.8081C104.325 25.9014 104.456 25.9761 104.587 25.9761H107.088C107.293 25.9761 107.405 25.8267 107.405 25.6587L107.443 11.7147C107.443 11.5467 107.293 11.3974 107.088 11.3974ZM62.848 11.3787H58.872C58.704 11.3787 58.5547 11.5467 58.5547 11.7521V25.4534C58.5547 25.8267 58.7973 25.9574 59.1147 25.9574H62.6987C63.072 25.9574 63.1653 25.7894 63.1653 25.4534V11.6961C63.1653 11.5281 63.016 11.3787 62.848 11.3787ZM60.888 5.06939C59.4507 5.06939 58.312 6.20806 58.312 7.64539C58.312 9.08272 59.4507 10.2214 60.888 10.2214C62.288 10.2214 63.4267 9.08272 63.4267 7.64539C63.4267 6.20806 62.288 5.06939 60.888 5.06939ZM91.6693 4.60272H87.7307C87.5627 4.60272 87.4133 4.75206 87.4133 4.92006V12.5547H81.2347V4.92006C81.2347 4.75206 81.0853 4.60272 80.9173 4.60272H76.9413C76.7733 4.60272 76.624 4.75206 76.624 4.92006V25.6587C76.624 25.8267 76.792 25.9761 76.9413 25.9761H80.9173C81.0853 25.9761 81.2347 25.8267 81.2347 25.6587V16.7921H87.4133L87.376 25.6587C87.376 25.8267 87.5253 25.9761 87.6933 25.9761H91.6693C91.8373 25.9761 91.9867 25.8267 91.9867 25.6587V4.92006C91.9867 4.75206 91.8373 4.60272 91.6693 4.60272ZM56.4453 13.7867V24.5014C56.4453 24.5761 56.4267 24.7067 56.3333 24.7441C56.3333 24.7441 54 26.4054 50.1547 26.4054C45.5067 26.4054 40 24.9494 40 15.3547C40 5.76006 44.816 3.78139 49.52 3.80006C53.5893 3.80006 55.232 4.71472 55.4933 4.88272C55.568 4.97606 55.6053 5.05072 55.6053 5.14406L54.8213 8.46672C54.8213 8.63472 54.6533 8.84006 54.448 8.78406C53.776 8.57872 52.768 8.16806 50.3973 8.16806C47.6533 8.16806 44.704 8.95206 44.704 15.1307C44.704 21.3094 47.504 22.0374 49.52 22.0374C51.2373 22.0374 51.8533 21.8321 51.8533 21.8321V17.5387H49.1093C48.904 17.5387 48.7547 17.3894 48.7547 17.2214V13.7867C48.7547 13.6187 48.904 13.4694 49.1093 13.4694H56.0907C56.296 13.4694 56.4453 13.6187 56.4453 13.7867Z" fill="white" />
            </g>
            <g clipPath="url(#clip1_0_1)">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 3C5.37 3 0 8.37 0 15C0 20.31 3.435 24.795 8.205 26.385C8.805 26.49 9.03 26.13 9.03 25.815C9.03 25.53 9.015 24.585 9.015 23.58C6 24.135 5.22 22.845 4.98 22.17C4.845 21.825 4.26 20.76 3.75 20.475C3.33 20.25 2.73 19.695 3.735 19.68C4.68 19.665 5.355 20.55 5.58 20.91C6.66 22.725 8.385 22.215 9.075 21.9C9.18 21.12 9.495 20.595 9.84 20.295C7.17 19.995 4.38 18.96 4.38 14.37C4.38 13.065 4.845 11.985 5.61 11.145C5.49 10.845 5.07 9.615 5.73 7.965C5.73 7.965 6.735 7.65 9.03 9.195C9.99 8.925 11.01 8.79 12.03 8.79C13.05 8.79 14.07 8.925 15.03 9.195C17.325 7.635 18.33 7.965 18.33 7.965C18.99 9.615 18.57 10.845 18.45 11.145C19.215 11.985 19.68 13.05 19.68 14.37C19.68 18.975 16.875 19.995 14.205 20.295C14.64 20.67 15.015 21.39 15.015 22.515C15.015 24.12 15 25.41 15 25.815C15 26.13 15.225 26.505 15.825 26.385C18.2072 25.5807 20.2772 24.0497 21.7437 22.0074C23.2101 19.965 23.9993 17.5143 24 15C24 8.37 18.63 3 12 3Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_0_1">
                <rect width="84" height="30" fill="white" transform="translate(40)" />
              </clipPath>
              <clipPath id="clip1_0_1">
                <rect width="24" height="24" fill="white" transform="translate(0 3)" />
              </clipPath>
            </defs>
          </svg>
          / &nbsp; &nbsp; Profile
        </div>
      </div>
      <div>
        <div className="container">
          <div className={widthScreen ? 'flex' : ''}>
            <RepositoryProfile profile={profile} />
            <div>
              <div className="flex">
                <button
                  onClick={() => handleRepositories()}
                  className={menuRepositories ? 'menu flex menu-emphasis' : 'menu flex'}
                >
                  {menuRepositories && (
                    <img src="./images/repositories.svg" alt="" />
                  )}
                  {!menuRepositories && (
                    <img src="./images/repositories2.svg" alt="" />
                  )}
                  <p>Repositories</p>
                  <span>{repositories.length}</span>
                </button>
                <button
                  className={menuStarred ? 'menu flex menu-emphasis' : 'menu flex'}
                  onClick={() => handleStarred()}
                >
                  {menuStarred && (
                    <img src="./images/starred2.svg" alt="" />
                  )}
                  {!menuStarred && (
                    <img src="./images/starred.svg" alt="" />
                  )}
                  <p>Starred</p>
                  <span>{repositoriesStarred.length}</span>
                </button>
              </div>
              <div className="container-search">
                <div className="search">
                  <div className={widthScreen ? ' ' : 'flex'}>
                    <div className="content-search">
                      <button className="select-search" onClick={() => handleSetTypeVisible()}>
                        <img src="./images/arrow-white.svg" alt="" />
                        Type
                      </button>
                      <button className="select-search" onClick={() => handleSetLanguageVisible()}>
                        <img src="./images/arrow-white.svg" alt="" />
                        Language
                      </button>
                      <div className='content-language'>
                        <button onClick={() => handleSetHidden()}>
                          <img src="./images/x.svg" alt="" />
                        </button>
                        <p>Language</p>
                        <ul>
                          <li className='custom-checkbox'>
                            <input 
                              type="checkbox"
                              name="language-repo" 
                              id='language-all'
                              defaultChecked={true}
                              checked={
                                (menuRepositories && (filteredLanguages.length === userLanguages.length || filteredLanguages.length === 0)) || 
                                (menuStarred && (filteredStarredLanguages.length === userStarredLanguages.length || filteredStarredLanguages.length === 0))
                              }
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilteredLanguages([])
                                  setFilteredStarredLanguages([])
                                }
                              }} 
                            />
                            <label htmlFor='language-all'>All</label>
                          </li>
                          {menuRepositories && userLanguages.map((language) => {
                            return (
                              <li className='custom-checkbox'>
                                <input 
                                  type="checkbox"
                                  name="language-repo" 
                                  checked={filteredLanguages.includes(language)}
                                  id={`language-${language}`}
                                  onChange={() => {
                                    if (!filteredLanguages.includes(language))
                                      setFilteredLanguages([...filteredLanguages, language])
                                    else {
                                      setFilteredLanguages(filteredLanguages.filter(filteredLanguage => filteredLanguage !== language));
                                    }
                                  }} 
                                />
                                <label htmlFor={`language-${language}`}>{`${language}`}</label>
                              </li>
                            );
                          })}
                          {menuStarred && userStarredLanguages.map((language) => {
                            return (
                              <li className='custom-checkbox'>
                                <input 
                                  type="checkbox"
                                  name="language-repo" 
                                  checked={filteredStarredLanguages.includes(language)}
                                  id={`language-${language}`}
                                  onChange={() => {
                                    if (!filteredStarredLanguages.includes(language))
                                      setFilteredStarredLanguages([...filteredStarredLanguages, language])
                                    else {
                                      setFilteredStarredLanguages(filteredStarredLanguages.filter(filteredLanguage => filteredLanguage !== language));
                                    }
                                  }} 
                                />
                                <label htmlFor={`language-${language}`}>{`${language}`}</label>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className='content-type'>
                        <button onClick={() => handleSetHidden()}>
                          <img src="./images/x.svg" alt="" />
                        </button>
                        <p>Type</p>
                        <ul>
                          <li className='custom-checkbox'>
                            <input 
                              type="checkbox" 
                              value="All" 
                              defaultChecked={true}
                              checked={
                                (!filterTypeSource && !filterTypeFork && !filterTypeArchived && !filterTypeMirror) || 
                                filterTypeSource && filterTypeFork && filterTypeArchived && filterTypeMirror
                              }
                              name="type-repo" 
                              id="type-all"
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setFilterTypeSource(false)
                                  setFilterTypeFork(false)
                                  setFilterTypeArchived(false)
                                  setFilterTypeMirror(false)
                                }
                              }} 
                            />
                            <label htmlFor="type-all">All</label>
                          </li>
                          <li className='custom-checkbox'>
                            <input 
                              type="checkbox" 
                              value="Sources"
                              checked={filterTypeSource}
                              name="type-repo" 
                              id="type-sources"
                              onChange={(e) => setFilterTypeSource(e.target.checked)}
                            />
                            <label htmlFor="type-sources">Sources</label>
                          </li>
                          <li className='custom-checkbox'>
                            <input 
                              type="checkbox" 
                              value="Forks"
                              checked={filterTypeFork}
                              name="type-repo" 
                              id="type-forks"
                              onChange={(e) => setFilterTypeFork(e.target.checked)}
                            />
                            <label htmlFor="type-forks">Forks</label>
                          </li>
                          <li className='custom-checkbox'>
                            <input 
                              type="checkbox" 
                              value="Archived" 
                              checked={filterTypeArchived}
                              name="type-repo" 
                              id="type-archived"
                              onChange={(e) => setFilterTypeArchived(e.target.checked)}
                            />
                            <label htmlFor="type-archived">Archived</label>
                          </li>
                          <li className='custom-checkbox'>
                            <input 
                              type="checkbox" 
                              value="Mirrors" 
                              checked={filterTypeMirror}
                              name="type-repo" 
                              id="type-mirrors"
                              onChange={(e) => setFilterTypeMirror(e.target.checked)}
                            />
                            <label htmlFor="type-mirrors">Mirrors</label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="search-desktop">
                      <button>
                        <img src="./images/search.svg" alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="search-mobile flex">
                    <button>
                      <img src="./images/search-mobile.svg" alt="" />
                    </button>
                    <input 
                      type="input" 
                      placeholder="Search Here"
                      onChange={(e) => setBusca(e.target.value.toLowerCase())}
                    />
                  </div>
                </div>
              </div>
              <section className="repository-list">
                {menuRepositories && (
                  <ul>
                    {reposFilter.map((repository) => <RepositoryItem key={repository.full_name} repository={repository} />)}
                  </ul>
                )}
                {menuStarred && (
                  <ul>
                    {reposFilter.map((repository) => <StarredItem key={repository.full_name} starred={repository} />)}
                  </ul>
                )}
                {reposFilter.length <= 0 && (
                  <p>Nenhum reposotório encontrado</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
