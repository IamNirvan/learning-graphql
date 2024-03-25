let games = [
    {id: '1', title: 'Need For Speed', platform: ['Playstation', 'Xbox', 'PC']},
    {id: '2', title: 'Skyrim: Elder Scrolls V', platform: ['Playstation', 'Xbox', 'PC']},
    {id: '3', title: 'GTA V', platform: ['Playstation', 'Xbox', 'PC']}
]

let authors = [
    {id: '1', name: 'Burce Wayne', verified: true},
    {id: '2', name: 'Lerkly Kent', verified: false},
]

let reviews = [
    {id: '1', rating: 10, content: 'Superb...', author_id: '1', game_id: '1'},
    {id: '2', rating: 8, content: 'Me Licky', author_id: '1', game_id: '2'},
    {id: '3', rating: 3, content: 'Abysmal', author_id: '2', game_id: '1'},
    {id: '4', rating: 6, content: 'Not bad', author_id: '2', game_id: '2'}
]

export default { games, authors, reviews }