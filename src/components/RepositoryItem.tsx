interface RepositoryItemProps {
  repository: {
    full_name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    language: string;
    forks_count: number;
    fork: boolean;
  }
}

export function RepositoryItem(props: RepositoryItemProps) {
  const nameRepository = props.repository.full_name.split('/');
  const linkPerfil = props.repository.html_url.split('/');
  

  return (
    <li>
      <div>
        <span className="link-repos">
          <a href={`${linkPerfil[0]}//${linkPerfil[2]}/${linkPerfil[3]}`} target="_blank">{nameRepository[0]}</a>
        </span>
        &nbsp;/&nbsp; 
        <span className="title-repo">
          <a href={props.repository.html_url} target="_blank">{nameRepository[1]}</a>
        </span>
      </div>
      <p>{props.repository.description}</p>
      <div className="box-counters flex">
        <div className="flex">
          <img src="./images/star.svg" alt="" />
          <p className="-color">{props.repository.stargazers_count}</p>
        </div>
        <div className="flex">
          <img src="./images/fork.svg" alt="" />
          <p className="-color">{props.repository.forks_count}</p>
        </div>
      </div>
    </li>
  );
}