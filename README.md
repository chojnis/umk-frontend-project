# Quiz app extended
## React + TypeScript + Vite

### Projekt zaliczeniowy na zajęcia z frontendu UMK

![image](https://github.com/chojnis/umk-frontend-project/assets/91784891/ab29b9a4-adc8-439e-b7df-1a825782f0b5)
![image](https://github.com/chojnis/umk-frontend-project/assets/91784891/e189616b-ee7e-455c-9ad4-1b7f6337b180)
![image](https://github.com/chojnis/umk-frontend-project/assets/91784891/4f09049b-28b6-4011-929f-a6dcad3f6f49)

https://master--relaxed-douhua-9b033a.netlify.app/

Aplikacja generuje Quizy we współpracy z darmowym API https://opentdb.com/. Domyślnie generuje 10 pytań z dowolnych kategorii, można natomiast edytować liczbę pytań, kategorie, a także typ odpowiedzi (wiele lub prawda/fałsz). Po odpowiedzeniu na wszystkie pytania możemy zobaczyć poprawne odpowiedzi oraz zacząć Quiz ponownie.

Spełnione wymagania:
* React
* Aplikacja interaktywna
* W pełni ostylowana i responsywna
* Uzupełnione readme.md
* Live preview
* Ustalona struktura projektu z podziałem na komponenty i oddelegowaniem obowiązków

a także:
* routing
* fetch do API
* typescript 
* react query - opakowanie fetch API, użyte w celu wielokrotnego odpytywania po otrzymaniu HTTP 429 przez limit na IP
* react spring - biblioteka do tworzenia animacji, użyte w celu stworzenia przyjaznego wyglądu aplikacji

Instalacja w lokalnym środowisku:
Wymagania:
* node *w wersji >= 20.9.0
* npm *w wersji >= 10.1.0
  
\*- wersja na której tworzona była aplikacja

Instalacja zależności:
```bash
npm i
```

Uruchomienie środowiska dev:
```bash
npm run dev
```

Budowanie aplikacji:
```bash
npm run build
```

Uruchamianie zbudowanej aplikacji na serwerze vite:
```bash
npm run preview
```
