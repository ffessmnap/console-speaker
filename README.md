# Outil speaker - Championnat de France 2026 Nage avec Palmes

En local, double-clique sur `Demarrer la console.bat`.

Ce lanceur :

- regenere les donnees au demarrage ;
- ouvre la console dans le navigateur ;
- surveille les fichiers sources ;
- regenere automatiquement `data.generated.js` et `donnees-speaker-france-2026.json` quand un fichier d'engagements ou une source change.
- permet aussi de relancer la regeneration depuis le bouton `Regenerer les donnees` dans la console.

Garde la fenetre ouverte pendant l'utilisation de la console.

## Organisation conseillee des fichiers

Depose les fichiers sources dans ces dossiers :

- `series` : le PDF des series a utiliser pour la console. S'il contient un PDF, il est prioritaire sur les engagements.
- `Resultats` : les resultats des meetings qui servent a retrouver le lieu du temps d'engagement.
- fichiers d'engagements : a garder a la racine pour le championnat de France si aucun PDF de series n'est utilise.

Si tu remplaces le PDF dans `series`, clique sur `Regenerer les donnees` ou laisse la console locale ouverte : elle relancera automatiquement la generation. Si plusieurs PDF sont presents dans `series`, le plus recent est utilise.

Sur GitHub Pages, publie le dossier complet avec au minimum :

- `index.html`
- `styles.css`
- `app.js`
- `data.generated.js`
- `donnees-speaker-france-2026.json`

Si `data.generated.js` ou `donnees-speaker-france-2026.json` manque, la console s'ouvre mais les donnees officielles ne se chargent pas.

## Ce que fait la premiere version

- selection d'une course et du sexe, les courses restant toutes categories confondues ;
- affichage des 8 meilleurs engagements 2026 par defaut, avec bouton pour voir toute la liste ;
- filtre optionnel par categorie ;
- fiche nageur au clic, avec toutes les courses ou il est engage ;
- affichage du Top 5 France 2025 par categorie Cadet, Junior et Senior ;
- affichage des temps de qualification Equipe de France seniors 2026 TSP/TRP ;
- affichage des MPF cadets/cadettes et des records France junior/senior ;
- notes libres par course ;
- import/export JSON pour remplacer les donnees d'exemple par les donnees officielles ;
- ajout rapide d'engages par collage CSV.

## Format CSV pour ajouter des engages

```csv
ligne;nom;prenom;club;categorie;temps;note
4;DURAND;Camille;Club Limoges;Junior;00:42.81;Finaliste 2025
```

## Donnees generees

Les fichiers `data.generated.js` et `donnees-speaker-france-2026.json` sont produits depuis les fichiers d'engagements, le protocole PDF 2025, les exports CSV des temps EDF et les pages FFESSM records/MPF avec `build_data.py`.

Les records affichent le titulaire, le club, la date et le lieu lorsque ces informations sont disponibles dans les pages FFESSM.

## Mise a jour des donnees sur GitHub

GitHub Pages ne lance pas Python et ne relit pas directement les fichiers `.txt`.

Quand les engagements changent, il faut regenerer `data.generated.js` et `donnees-speaker-france-2026.json`. Le workflow GitHub `Regenerer les donnees speaker` peut le faire automatiquement quand tu pousses de nouveaux fichiers source. Il peut aussi etre lance manuellement depuis l'onglet `Actions` du depot.

Pour que GitHub Pages fonctionne, active Pages sur la branche qui contient `index.html`, puis ouvre l'URL publique fournie par GitHub Pages.

## Prochaine etape conseillee

Deposer dans ce dossier les resultats 2025 en PDF et les engagements 2026. A partir de ces fichiers, les donnees d'exemple pourront etre remplacees par un export JSON propre pour alimenter l'outil.
