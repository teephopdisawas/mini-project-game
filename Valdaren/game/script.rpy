# The script of the game goes in this file.

# Declare characters used by this game. The color argument colorizes the
# name of the character.

define e = Character("Eileen", color="#c8ffc8")


# The game starts here.

label start:

    scene bg room
    show eileen happy

    # Simple name input
    $ _tmp = renpy.input("What's your name?")
    if _tmp is not None:
        $ _tmp = _tmp.strip()
        if _tmp != "":
            $ player_name = _tmp[:30]

    e "Welcome, [player_name]. The glyphs hum when you breathe near them."

    e "Before you step farther, pick a language to begin interpreting Ellidric." 

    menu:
        "Choose a starting language to interpret Ellidric:"
        "English":
            $ learn_language('english')
            e "English refracts the glyph as a crisp, precise meaning."
        "Dutch":
            $ learn_language('dutch')
            e "A warm image flickers — a domestic memory.",
        "Classical Latin":
            $ learn_language('latin')
            e "The glyph resonates with ritual cadence."
        "Modern Greek":
            $ learn_language('greek')
            e "A sad, beautiful chord answers you."

    jump hub

label hub:
    scene bg room
    e "You stand in the hub. What do you do?"

    menu:
        "Open Map":
            show screen world_map
            $ renpy.pause(0.1)
            jump hub
        "Open Lexicon":
            show screen lexicon_sidebar
            $ renpy.pause(0.1)
            jump hub
        "Inspect a glyph (Memory‑Dive)":
            jump memory_dive
        "Check known languages":
            $ known = ', '.join(known_languages)
            e "You know: [known]."
            jump hub
        "View consequences log":
            $ c = []
            for k,v in consequence_map.items():
                $ c.append("%s: %s" % (k, ','.join(v)))
            if c:
                e "Consequences: [" + '; '.join(c) + "]"
            else:
                e "No consequences recorded yet."
            jump hub
        "Save & Quit":
            return

label memory_dive:
    e "You activate a Memory‑Dive Chamber. Choose a tether to probe."

    menu:
        "Flicker (m_intro)":
            if memories['m_intro']['locked']:
                e "The glyph resists — it needs more semantic context to open."
                jump memory_dive
            else:
                e "[memories['m_intro']['content']]"
                $ consequence_map.setdefault('m_intro', []).append('inspected')
                jump hub

        "Childhood Song (m_childhood)":
            if memories['m_childhood']['locked']:
                e "Soft resistance — the tether won't release yet."
                jump memory_dive
            else:
                e "[memories['m_childhood']['content']]"
                $ consequence_map.setdefault('m_childhood', []).append('inspected')
                jump hub

        "Attempt to translate a glyph":
            e "You try to render the glyph through your current languages..."
            $ renpy.notify('Translation attempt started')
            # Simple mechanic: if player knows more than one language, unlock a sample memory
            if len(known_languages) > 1:
                $ unlock_memory('m_intro')
                e "A fragment unseals — something recognizes you."
            else:
                e "Not enough interpretative context. Try learning another language."
            jump memory_dive

# Expanded definitions and basic systems for the Valdaren project
default player_name = "Traveler"
default known_languages = ["common"]
default language_flags = {"english": False, "dutch": False, "latin": False, "greek": False}
default memories = {}
default consequence_map = {}
default faction_influence = {}

init python:
    # Helper: learn a language (adds it to known_languages and flips a flag)
    def learn_language(lang):
        key = lang.lower()
        if key not in known_languages:
            known_languages.append(key)
        language_flags[key] = True

    # Helper: unlock a memory by id
    def unlock_memory(mem_id):
        if mem_id in memories:
            memories[mem_id]['locked'] = False

    # Seed a couple example memories if missing
    memories.setdefault('m_intro', { 'title':'Flicker', 'locked': True, 'content':'A half-remembered taste of salt and smoke.' })
    memories.setdefault('m_childhood', { 'title':'Childhood Song', 'locked': True, 'content':'A lullaby about falling stars.' })

    # expose callable to screens
    def _show_region_info(region_id):
        from renpy.store import renpy
        renpy.show_screen('region_info')

    # initialize faction influence from JSON, if available
    try:
        import json, os
        path = os.path.join(r"c:\Users\theet\OneDrive\0.at\School\mini-project-game\Valdaren\game\data\faction_map.json")
        with open(path, 'r', encoding='utf-8') as f:
            _fm = json.load(f)
            default faction_influence = {}
            for r in _fm.get('regions', []):
                faction_influence[r['id']] = r.get('influence', 0)
    except Exception:
        default faction_influence = {}
