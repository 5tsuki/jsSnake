function saveScore() {
    // Add a new document in collection "scores"
    db.collection("scores").doc().set({
            name: theGuyPlaying.username,
            score: theGuyPlaying.score
        })
        .then(function () {
            console.log("Document successfully written!");
            updateScores();
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
}

function updateScores() {
    i = 1;
    document.getElementById('scoreboard').innerHTML = '<tr><td><i class="fas fa-trophy"></i></td><td>Name</td><td>Score</td></tr>';
    db.collection("scores").orderBy("score", "desc").limit(20).get().then((snapshot) => {
        snapshot.forEach((doc) => {
            $("#scoreboard").append('<tr>' +
                '<td>' + i + '</td>' +
                '<td>' + doc.data().name + '</td>' +
                '<td>' + doc.data().score + '</td>' +
                '</tr>'
            );
            i++;
        })
    })
}