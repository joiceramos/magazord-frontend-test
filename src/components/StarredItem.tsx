interface StarredItemProps {
  starred: {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    language: string;
    html_url: string;
  }
}

export function StarredItem(props: StarredItemProps) {
  const nameRepository = props.starred.full_name.split('/');
  const linkPerfil = props.starred.html_url.split('/');  

  return (
    <li>
      <div>
        <span className="link-repos">
          <a href={`${linkPerfil[0]}//${linkPerfil[2]}/${linkPerfil[3]}`} target="_blank">{nameRepository[0]}</a>
        </span>
        &nbsp;/&nbsp;  
        <span className="title-repo">
          <a href={props.starred.html_url} target="_blank">{nameRepository[1]}</a>
        </span>
      </div>
      <p>{props.starred.description}</p>
      <div className="box-counters flex">
        {props.starred.language && (
          <div className="flex">
            <p className="-color">{props.starred.language}</p>
          </div>
        )}
        <div className="flex">
          <img src="./images/fork.svg" alt="" />
          <p className="-color">{props.starred.forks_count}</p>
        </div>
      </div>
    </li>
  );
}