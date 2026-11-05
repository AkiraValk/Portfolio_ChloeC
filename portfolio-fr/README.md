# Portfolio de Chloé Charon (version française)

Site statique en HTML / CSS / JS simple, prévu pour GitHub Pages. Pas d'outil à installer : on modifie les fichiers, on les envoie sur GitHub, c'est en ligne.

## Structure

```
index.html                  redirige vers fr/index.html
fr/
  index.html                accueil
  alternance.html           page alternance (à remplir)
  stage.html                stage
  projets.html              catalogue des projets (filtres)
  projets/<nom>.html        une fiche par projet / SAÉ / ressource (22)
  formation.html            vue d'ensemble de la formation
  formation/but1|but2|but3  détail par année
  competences.html          compétences, preuves, savoir-être
  parcours.html             présentation, parcours, réussites
  contact.html              contact et CV
assets/
  css/style.css             tout le style (couleurs en haut du fichier : --accent)
  js/site.js                menu, pied de page, adresse du dépôt, filtres
  PI_MQTT/CollecteMQTT.py   version nettoyée du script (sans mots de passe)
```

Les dossiers `assets/BUT1`, `assets/BUT2`, `assets/Images_PI`, etc. de ton ancien dépôt sont réutilisés tels quels.

## Où modifier quoi

- Menu et pied de page : `assets/js/site.js` (tableau `NAV`). Un seul endroit pour tout le site.
- Adresse du dépôt : `REPO` en haut de `assets/js/site.js`. À changer si ton dépôt n'a pas le même nom.
- Couleur d'accent : variable `--accent` au début de `assets/css/style.css`.
- Textes : directement dans les fichiers `.html`, entre les balises.

## Les textes à compléter

Tout ce qui est à écrire par toi est marqué `[À COMPLÉTER : ...]` (cadre orange en pointillés, classe `todo`). Pour les retrouver : recherche `À COMPLÉTER` dans ton éditeur. Quand tu as écrit ton texte, supprime la balise `<span class="todo">` ou `<p class="todo">` et garde ton texte.

Priorités : `fr/alternance.html`, les sections "Ma part du travail" et "Difficultés rencontrées" des fiches, `fr/formation/but3.html`, la section disponibilités de `fr/contact.html`.

## Publier sur GitHub Pages

1. Copie ces fichiers à la racine du nouveau dépôt.
2. Sur GitHub : Settings, Pages, "Deploy from a branch", branche `main`, dossier `/ (root)`.
3. Le site sera sur `https://<ton-pseudo>.github.io/<nom-du-dépôt>/`.

## Avant de publier : sécurité

- Supprimer `assets/BUT2/SAE_3.01/DjangoP3/` (clé secrète Django, identifiants MQTT, base de données).
- Ne pas reprendre l'ancien `assets/PI_MQTT/CollecteMQTTpy.py` (identifiants de base de données en dur) : utiliser `CollecteMQTT.py` fourni.
- Changer les mots de passe qui ont pu être publiés, même si les fichiers sont supprimés (l'historique git les garde).

## Version anglaise

Prévue plus tard dans un dossier `en/`, avec la même structure.
