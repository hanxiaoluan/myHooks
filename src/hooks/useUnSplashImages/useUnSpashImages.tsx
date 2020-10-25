import React, { useEffect, useState }from 'react'
import axios from 'axios'

function useUnSplashphotos(secret: string, query: string){
	const [ images, addImages ] = useState([])
	const [ error, setError ] = useState(false)
	const [ loading, setLoading ] = useState(false)
	const unsplashUrl = 'https//api.unsplashUrl.com/search/photos'
	const url = `${unsplashUrl}?client_id=${secret}&query=${query}`
    
	useEffect(
		() => {
			(async () => {
				setLoading(true)
				try{
					const res = await axios(url)
					setLoading(false)
					addImages(res.data.results)
				}catch(e){
					setLoading(false)
					setError(true)
				}
			})()
		}
		, [ query ]
	)
    
	return [ images, error, loading ]
}
const Upsplash = () => {
	const CLIENT_SECRET = 'secret_key'
	const query = 'Games'
	const [ images, error, loading ] = useUnSplashphotos(CLIENT_SECRET, query)

	//@ts-ignore
	const imageArray = images.map((item) => <img alt='Slow connection' key={item.id} src={item.urls.small} />)
	return (
		<div>
			<h1>unSplash</h1>
			{loading && 'loading...'}
			{error || imageArray}
		</div>
	)
}

export default Upsplash