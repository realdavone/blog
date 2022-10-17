import useFetch from '../hooks/fetch'
import './About.scss'

type Author = {
  name: string,
  jobs: string,
  desc: string,
  socials: string,
  img: string
}

interface FetchAuthorResponse {
  loading: boolean,
  data: Author | null,
  error: string | null
}

type Social = {
  url: string,
  label: string
}

export const About = () => {
  const { loading, error, data }: FetchAuthorResponse = useFetch('user/author')

  return (
    <section className="about">
      <>
      {loading && <span>Načítavam...</span>}
      {data !== null && 
      <>
        <div className="photo">
          <img src={data.img} alt="Photo" />
        </div>
        <div className="content">
          <span className='name'>{data.name}</span>
          <span className='occupation'>{data.jobs}</span>
          <span className='desc'>{data.desc}</span>
          <div className='socials'>
            {JSON.parse(data.socials).map((social: Social) => <a href={social.url} target={'_blank'} key={social.label}>{social.label}</a>)}
          </div>
        </div>
      </>}
      {error && <span>{error}</span>}
      </>
    </section>
  )
}
