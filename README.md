Le projet est un template pour rapidement mettre en production des applications utilisant React Django et PostGreSQL.

Les différents containers construits sont :

- Frontend avec ReactJS
- Backend avec Django
- Base de données PostgreSQL
- PgAdmin
- SMTP

Le dossier src est séparé en trois :
- `_install` : contenant les fichiers Docker pour construire les containers
- `frontend` : contenant les fichiers persistants du frontend
- `backend` : contenant les fichiers persistants du backend

## Dossier _install
Dans le fichier src/_install/ :  
- un docker-compose.yml 
- un dossier _container

# Instructions

## 1. Définition des variables d'environnement

Le dossier _containers, on doit construire des dossiers pour chaque container.
Deux sont existants :
- le front : `react-front`
- le back : `django-api`

On va pour cela créé deux nouveaux dossiers dans `_install` :
- `postgresql`
- `pgadmin`

On créé un fichier .env par container avec les éléments à suivre :

Dans `django-api`, on écrit dans `.env` les variables suivantes :
```
SECRET_KEY=<Your Secret Key>
DEBUG=True
ALLOWED_HOSTS='127.0.0.1 localhost'

DJANGO_SUPERUSER_USERNAME=<Your django superuser username>
DJANGO_SUPERUSER_EMAIL=<Your django superuser email>
DJANGO_SUPERUSER_PASSWORD=<Your django superuser password>

CORS_ALLOW_CREDENTIALS=True
CORS_ALLOWED_ORIGINS=http://localhost:5173
CORS_ORIGIN_WHITELIST=http://localhost:5173

POSTGRES_DB=<Nom de la base de données postgres>
POSTGRES_USER=<Utilisateur de la base de données postgres>
POSTGRES_PASSWORD=<Mot de passe de la base de données postgres>
POSTGRES_ENGINE=django.db.backends.postgresql
POSTGRES_HOST=db_postgres
POSTGRES_PORT=5432
```

Dans `react-front`, on écrit dans `.env`:
```
VITE_API_BASE_URL=http://localhost:3200/
```

Si on choisit un port différent dans le docker-compose pour le front, ne pas oublier la ligne pour les websockets

```
WDS_SOCKET_PORT=3005 
```

Dans `postgresql`, on place un `.env` avec
```
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
```

Dans `pgadmin`, on place un `.env` avec
```
PGADMIN_DEFAULT_EMAIL=<pgadmin_email>
PGADMIN_DEFAULT_PASSWORD=<pgadmin_password>
```

## 2. Commandes Docker

On se place dans le dossier _install avec la commande : `cd src/_install/`

`docker-compose build`  
`docker-compose -p <nom_projet> up -d`
