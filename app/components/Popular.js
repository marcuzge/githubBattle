var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api');
var Loading = require('./Loading');

function SelectLanguage(props) {
	var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
	return (
		<ul className="languages">
			{languages.map((lang) => {
				return (
					<li 
						style={lang === props.selectedLanguage ? {color: "#d0021b"}: null}
						onClick={props.onSelect.bind(null, lang)} 
						key={lang}>
							{lang}
					</li>
				)
			})}
		</ul>		
	)
}

function RepoGrid(props) {
	return (
		<ul className="popular-list">
			{props.repos.map(function(repo, index) {
				return (
					<SingleRepo repo={repo} index={index} key={repo.name} />
				)
			})}
		</ul>
	)
}

function SingleRepo(props) {
	return (
		<li key={props.repo.name} className="popular-item">
			<div className="popular-rank">#{props.index+1}</div>
			<ul className="space-list-items">
				<li>
					<img className='avatar' src={props.repo.owner.avatar_url} alt={'Avatar for ' + props.repo.owner.login} />
				</li>
				<li><a href={props.repo.html_url}>{props.repo.name}</a></li>
				<li>@{props.repo.owner.login}</li>
				<li>{props.repo.stargazers_count} stars</li>
			</ul>
		</li>	
	)
}

SingleRepo.propTypes = {
	repo: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
}

RepoGrid.propTypes = {
	repos: PropTypes.array.isRequired,
}

SelectLanguage.propTypes = {
	selectedLanguage: PropTypes.string.isRequired,
	onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedLanguage: "All",
			repo: null
		};

		this.updateLanguage = this.updateLanguage.bind(this);
		console.log(this);
	}

	componentDidMount() {
		//AJAX
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang) {
		this.setState(function() {
			return {
				selectedLanguage: lang,
				repo: null
			}
		})

		api.fetchPopularRepos(lang)
		  .then(function(repos) {
		  	this.setState(function() {
		  		return {
		  			repo: repos
		  		}
		  	})
		  }.bind(this));
	}

	render() {
		return (
			<div>
				<SelectLanguage
				   selectedLanguage = {this.state.selectedLanguage}
				   onSelect = {this.updateLanguage} 
				/>
				{/*{JSON.stringify(this.state.repo, 2, null)}*/}
				{!this.state.repo ? <Loading text='Be Patient' speed={60}/> : <RepoGrid repos={this.state.repo} />}
			</div>
		)
	}
}

module.exports = Popular;