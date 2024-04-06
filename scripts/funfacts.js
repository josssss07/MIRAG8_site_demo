let fun_fact = [
    ['Who wrote the first computer program?', 'Augusta Ada King, Countess of Lovelace (10 December 1815 – 27 November 1852), born Augusta Ada Byron and now commonly known as Ada Lovelace, was an English mathematician and writer chiefly known for her work on Charles Babbages early mechanical general-purpose computer, the Analytical Engine.'],
    ['Why is it called a hamburger?', 'The name “hamburger” actually came from Hamburg, the second largest city in Germany. In the late 1700s, sailors who traveled between Hamburg and New York City often ate hard slabs of salted minced beef, which they called “Hamburg steak.”']
    ['When is Cinco de Mayo celebrated in US?', 'Cinco de Mayo is annually observed on May 5. It celebrates the defeat of the French army during the Battle of Puebla (Batalla de Puebla) in Mexico on May 5, 1862. It is not to be confused with Mexicos Independence Day. Cinco de Mayo is a day of Mexican pride and heritage.'],
    ['Is the killer whale a type of dolphin?', 'Well, it turns out that killer whales have been known to prey on sharks. Orcas have also been known to eat mako sharks and several other species. When hunting sharks, killer whales always end up flipping the shark upside down, regardless of how the attack starts.'],
    ['Who is generally considered to be the first king of England?','Arguments are made for a few different kings deemed to control enough of the ancient kingdoms of the Anglo-Saxons to be deemed the first King of England. For example Offa, king of Mercia, and Egbert, king of Wessex, are sometimes described as kings of England by popular writers, but not by all historians.'],
    ['When was the first electric guitar made?', 'To counteract these problems, inventors experimented with solid-body guitars. In 1940, Les Paul created “The Log,” a guitar whose strings and pickups were mounted on a guitar body carved from a solid block of wood. The first recordings of electric guitars were made in 1933 by Hawaiian music artists such as Andy Iona.'],
    ['Why did the Mississippi River run backwards?', 'In 1811 and 1812, a series of earthquakes emanated from New Madrid, Missouri, and were felt as far away as Ohio and South Carolina. The soil beneath the Mississippi River rose, temporarily changing its course so that it flowed backward.'],
    ['Who ran the first 4 minute mile?', 'Roger Bannister ran the first sub-4 minute mile 60 years ago today. Sixty years ago on Tuesday, Roger Bannister, a 25-year-old medical student completed what at the time* seemed to be impossible: A sub-four minute mile.'],
    ['How many KFC restaurants are there in the world?', 'By December 2013, there were 18,875 KFC outlets in 118 countries and territories around the world. There are 4,563 outlets in China, 4,491 in the United States, and 9,821 across the rest of the world. Outlets are owned by franchisees or directly by the company.'],
    ['Where did the word dad come from?','Even the Oxford English Dictionary throws its hands up and admits “of the actual origin we have no evidence.” But, the OED continues, “the forms dada and tata, meaning father, originating in infantile or childish speech, occur independently in many languages.”'],
    ['Who plays Hansel in Zoolander?', 'The dim-witted but good-natured Derek Zoolander (Ben Stiller) is ousted as the top male fashion model by the rising star, Hansel McDonald (Owen Wilson), and his reputation is further tarnished by a critical article from journalist Matilda Jeffries (Christine Taylor).'],
    ['Are doves and pigeons the same thing?', 'Pigeons and doves are both common names that cause confusion, as the rock dove is the same as a common pigeon, but there are many different species of doves. Identify a bird by its scientific name when looking for differences between species with information from a pet hobbyist in this free video on pet care.'],
    ['Why is it called a hat trick?', 'A hat trick originally meant three goals in a row, with no intervening goals by either team. Hockey borrowed the term from Cricket. In 1858, a cricket player in England took three wickets with consecutive balls, an incredible trick. As a reward, his club gave the bowler a new hat, hence the term "hat trick."'],
    ['How long is the Hadron Collider tunnel?', 'The LHC is the worlds largest and highest-energy particle accelerator. The collider is contained in a circular tunnel, with a circumference of 27 kilometres (17 mi), at a depth ranging from 50 to 175 metres (164 to 574 ft) underground.'],
    ['Do your eyes see upside down?','The human eye actually sees everything upside down. Light enters the eye through the cornea and is further refracted when it hits the lens. Here it is flipped upside down and projected onto the retina.'],
    ['Which country has the most camels in the world?', 'The Bactrian camel is, as of 2010, reduced to an estimated 1.4 million animals, most of which are domesticated. The only truly wild Bactrian camels, of which there are less than one thousand, are thought to inhabit the Gobi Desert in China and Mongolia. The largest population of feral camels is in Australia.'],
    ['Who invented the Fahrenheit scale?', 'Fahrenheit (symbol °F) is a temperature scale based on one proposed in 1724 by the German physicist Daniel Gabriel Fahrenheit (1686–1736), after whom the scale is named.'],
    ['What igneous rock can float on water?', 'Pumice is composed of highly microvesicular glass pyroclastic with very thin, translucent bubble walls of extrusive igneous rock.']
    ['Which country has the most islands in the world?', 'The five main archipelagos are Indonesia, Japan, the Philippines, New Zealand, and the British Isles. The largest archipelagic state in the world, by area and population, is Indonesia. The archipelago with the most islands is the Archipelago Sea in Finland.'],
    ['What percent of the population is ambidextrous?', 'About 90 percent of people are right-handed, says Corballis. The remaining 10 percent are either left-handed or some degree of ambidextrous, though people with "true" ambidexterity—i.e., no dominant hand at all—only make up about 1 percent of the population.'],
    ['How many countries have a mcdonalds?', 'McDonalds Corp. is the worlds largest restaurant chain, with 34,480 restaurants in 119 countries. The burger chain has famously gone where few fast-food chains have gone before as a symbol—for better or worse – of capitalism.'],
    ['Which is the largest bone in the human body?', 'The head of the femur articulates with the acetabulum in the pelvic bone forming the hip joint, while the distal part of the femur articulates with the tibia and patella forming the knee joint. By most measures the femur is the strongest bone in the body. The femur is also the longest bone in the body.']
    ['Can you get stung by a dead jellyfish?', 'Jellyfish can sting with their tentacles if they brush against you when youre swimming in the ocean. You also can get stung if you step on a jellyfish, even a dead one. Usually, jellyfish stings will hurt, but are not emergencies.']
]; 

function displayRandomFunFact() {
    
    const randomIndex = Math.floor(Math.random() * fun_fact.length);
  
    const questionElement = document.getElementById("fun-fact-quest");
    const answerElement = document.getElementById("fun-fact-ans");
  
        questionElement.textContent = fun_fact[randomIndex][0];
    answerElement.textContent = fun_fact[randomIndex][1];
  }
  setTimeout(displayRandomFunFact, 600000)
    window.onload = displayRandomFunFact;
  