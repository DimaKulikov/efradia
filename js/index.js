const lessons = [
  {
    text: `The first known facts about what now is Orekhovo-Zuyevo date back to 1209. The place was mentioned in the Moscow Chronicles as the place called "Volochok" where the battle between Vladimir's prince Yury and Ryazan's prince Izyaslav took place. The name "Volochok" (or, as it was later called, "Zuyev Volochok") is derived from the Slavic word for "portage": a place where wooden ships were carried by land from one river to another. In this place in particular, the ships were usually moved by land between the Klyazma and Nerskaya Rivers. The villages Orekhovo and Zuyevo were mentioned in the chronicle several more times during the Middle Ages.
    ---
    In 1797, serf peasant Savva Vasilievich Morozov (Russian: Савва Васильевич Морозов) opened his first silk factory in Zuyevo. Later he shifted from silk to wool. In 1823, profits from his business allowed him to be freed from serfdom. In 1830, he moved his factories to the opposite bank of the Klyazma River to the place that was later named Nikolskoye.
    ---
    At the end of the 19th and the beginning of the 20th centuries, Orekhovo and Zuyevo were the third largest textile production area in Russia after Moscow and St. Petersburg.
    ---
    The first and largest Russian strike occurred in 1885 at Morozov's textile factories in Orekhovo-Zuyevo. Starting on January 7, 1885, at 10 o'clock in the morning, Vasily Volkov raised his hand and a red flag symbolizing victory for the workers and for all to follow him. On the fifth day of the strike, soldiers with their bayonets fixed arrived to arrest the leaders, Volkov and F. Shelukhin, at which time they shouted to their comrades and brothers, "Remember, one for all and all for one!"[11] This strike lasted several weeks and created the momentum for the revolutionary movement in Russia. Sometimes abbreviated as Orekh (Russian: Оре́х), a walnut or Orekhovo (Russian: Оре́хово) flavored brandy is often drank to not forget the sacrifices that these strikers in 1885 went through to standup and improve the lives of workers throughout the world.[8]
    ---
    The Soviet of Workers' Deputies in Orekhovo were elected in March 1917 as one of the first Bolshevik soviets in Russia. Six weeks later, the birthplace of Savva Morozov was controlled by the Soviets. This was six months before the Bolshevik victory in the October Revolution in Petrograd. In May 1917, the representative of the Moscow District Committee of the RSDLP(b) wrote: "The masses in Orekhovo are very well disciplined, following the Soviet of Workers' Deputies, in which all are Bolsheviks ... The influence of this organization is such that Orekhovo is now under the dictatorship of the proletariat."[8]`,
    title: 'Lesson number one'
  },
  {
    title: 'Lesson number two',
    text: `The accepted answer about Firebase is a good, quick reply, but I want to write a longer and more comprehensive response for anyone who is investigating this topic, as Firebase is one of several ways to achieve this kind of functionality.
    ---
    By way of background, databases/datastores like mysql, postgres, redis, mongodb, etc. are the most common way to store visitor data in the way that the next visitor and see or access it. Content management systems such as Django, Wordpress, and Drupal are built to read and write to a database. These services tend to be server-side technology, which is to say that a server admin sets them up, and blocks of code that the website's users cannot see communicate with the database. That server side code base also builds the rendered html that a user will see. So in general, Github Pages are not used with these kinds of technology because they support only static html, css, and javascript--that is, they allow client side code only.
    ---
    For more on this topic, see How to connect html pages to mysql database?
    ---
    If you want to set up a read only datastore, you have a lot of options on Github pages. You could put a json file in your repo, query a drive document, upload an sqlite.db file to your repo and query it, etc. In this imagined example, you would have to be ok with a website user seeing any data in your datastore, as the setup would not provide a way to make some data invisible to the user.
    ---
    As soon as you're thinking about writing to your database, however, security is a concern. If you set up some kind of offsite database and put DB access credentials into your client-side code, any user could see those credentials and compromise your database (inject data, take it over, delete it, etc.) For this reason alone, you need a setup that passes data from the front end to the back end and vice versa without letting website traffic see under the hood. As I understand it, this is a level of functionality that Github Pages can't give you.
    ---
    For more on client-side database security, see this thread: https://softwareengineering.stackexchange.com/questions/180012/is-there-any-reason-not-to-go-directly-from-client-side-javascript-to-a-database
    ---
    One potential workaround is to use your static side to link to a third party service. You can, for example, embed a Google form in an html page. That form can link to a Google sheet. That sheet can be published to the web and be set to update automatically. Your Github pages site can reference the public version of that page and update (on a delay) when changes are submitted. This type of setup is clunky (I assume Google sheets get slow if they get too big) and should be used with caution, as a poorly designed form of this kind could be a spam magnet. Not to mention that anyone who looks at your client side code will be able to find an view the public version of your Google sheet, which will include submission time and user data if you collect it. However, if used carefully, it could work for the use case mentioned above.The accepted answer about Firebase is a good, quick reply, but I want to write a longer and more comprehensive response for anyone who is investigating this topic, as Firebase is one of several ways to achieve this kind of functionality.`
  }
]

const lessonLinks = document.querySelector('.lesson-grid');
const lessonContainer = document.querySelector('.lesson');
const frameLinks = document.querySelector('.frame_lesson-grid');
const frameLesson = document.querySelector('.frame_lesson');
const backBtns = document.querySelectorAll('.back-btn');
const lessonSubtitle = document.querySelector('.lesson__subtitle');

backBtns.forEach(button => {
  button.addEventListener('click', () => {
    frameLinks.classList.toggle('frame_active');
    frameLesson.classList.toggle('frame_active');
    lessonContainer.innerHTML = '';
  })
})

const buildLesson = (lesson) => {
  const paragraphs = lesson.text.split('---');
  const template = document.querySelector('#lesson-paragraph').content;
  paragraphs.forEach((paragraph, i) => {
    const newParagraph = template.cloneNode(true);
    const image = newParagraph.querySelector('.lesson__image');
    const audio = newParagraph.querySelector('source');
    const text = newParagraph.querySelector('.lesson__paragraph');
    image.src = `/lessons/${lesson.title}/img/${i + 1}.jpg`;
    audio.src = `/lessons/${lesson.title}/audio/${i + 1}.mp3`;
    text.textContent = paragraph;
    lessonSubtitle.textContent = lesson.title;
    lessonContainer.append(newParagraph);
  });
}

const buildLessonLinks = (lessons, i) => {
  const template = document.querySelector('#lesson-link').content;
  lessons.forEach(lesson => {
    const newLink = template.cloneNode(true);
    const image = newLink.querySelector('.lesson-grid__image');
    const title = newLink.querySelector('.lesson-grid__title');
    image.src = `/lessons/${lesson.title}/img/1.jpg`;
    title.textContent = lesson.title;
    lessonLinks.append(newLink);
    image.addEventListener('click', () => {
      console.log('click')
      lessonContainer.innerHTML = '';
      buildLesson(lesson);
      frameLinks.classList.toggle('frame_active');
      frameLesson.classList.toggle('frame_active');
    })
  });
}

buildLessonLinks(lessons);



