import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          heading: {
            title: "Scan Your Ableton Live Project Files",
            subTitle:
              "Identify samples not stored in your User Folder & list all the plugins used.",
            faq: "How does this site work?",
            slogan: "Never lose a single sound in your creations.",
          },
          faq: {
            title: "Usage of ALS Analysis",
            subTitle1:
              "This online tool displays information from your Ableton Live projects without loading them in your DAW.",
            subTitle2:
              "It identifies plugin and audio file dependencies in a project.",
            question1: {
              question: "How is the analysis done?",
              answer:
                "Each selected file is processed using client-side JavaScript to gather information without uploading your project's data externally.",
            },
            question2: {
              question: "Where is my analysis information stored?",
              answer:
                "Information is stored in the browser's local storage, ensuring it's not saved on any database or sent externally.",
            },
            question3: {
              question:
                "How are Audio Clips marked as <b className='text-destructive'>External</b> identified?",
              answer:
                "Any audio clip not containing the terms <b className='text-primary'>Project</b> or <b className='text-primary'>User Library</b> in their file paths are marked as <b className='text-destructive'>External</b>.",
              detail: "This process will be optimized in the future.",
            },
            question4: {
              question: "What information will I get from my projects?",
              answer:
                "You will be able to see: <ul className='flex list-disc flex-col gap-3 px-6'> <li> A list of each track type (Audio, MIDI, Group, Send, Master) with a summary of devices and audios on it. <div className='text-xs italic text-muted-foreground/70'> Tip: Hover over the Devices & Audios counter for details. </div> </li> <li> A summary of all <b className='text-destructive'>External</b> (VST, VST3, or M4L) devices used. </li> <li> A summary of all Audio Clips, marking any <b className='text-destructive'>External</b> Clips. <div className='text-xs italic text-muted-foreground/70'> Tip: Hover over the Audio Clip path for the full directory. </div> </li> </ul>",
            },
            contribute: {
              title: "Have any feedback or suggestions?",
              description:
                "Feel free to create an issue on the <a href='https://github.com/pablo-kitz/als-analysis' className='font-bold hover:underline' > Github Repo </a> or <a href='https://www.instagram.com/pablokitz/' className='font-bold  hover:underline' > contact me </a> .",
            },
          },
          toast: {
            invalidFile: {
              title: "Invalid file type",
              description: "Only .als files are allowed.",
            },
            genericError: {
              title: "Error",
              description: "Error ocurred, please check the console",
            },
          },
          fileInput: {
            description:
              "<b>Click</b> or <b>drag and drop</b> to upload your .als file",
          },
          reportLine: {
            tracks: {
              title: "Tracks",
              column1: "Track Name",
              column2: "Track Type",
              column3: "Track Devices - Audios",
            },
            devices: {
              title: "Devices",
              column1: "Device Name",
              column2: "Device Type",
              column3: "Device Location",
            },
            audios: {
              title: "Audios",
              column1: "Audio Name",
              column2: "Audio View Location",
              column3: "Audio File Location",
            },
          },
          footer: {
            createdBy: "Created by",
          },
        },
      },
      es: {
        translation: {
          heading: {
            title: "Escanea tu proyecto de Ableton Live",
            subTitle:
              "Identifica samples que no están almacenados en tu carpeta de usuario y enumera todos los plugins utilizados.",
            faq: "¿Cómo funciona este sitio?",
            slogan: "Nunca pierdas un solo sonido en tus creaciones.",
          },
          faq: {
            title: "Uso del Análisis de ALS",
            subTitle1:
              "Esta herramienta en línea muestra información de tus proyectos de Ableton Live sin cargarlos en tu DAW.",
            subTitle2:
              "Identifica las dependencias de plugins y archivos de audio en un proyecto.",
            question1: {
              question: "¿Cómo se realiza el análisis?",
              answer:
                "Cada archivo seleccionado se procesa utilizando JavaScript del lado del cliente para recopilar información sin cargar externamente los datos de tu proyecto.",
            },
            question2: {
              question: "¿Dónde se almacena la información de mi análisis?",
              answer:
                "La información se almacena en el almacenamiento local del navegador, asegurando que no se guarde en ninguna base de datos ni se envíe externamente.",
            },
            question3: {
              question:
                "¿Cómo se identifican los Clips de Audio marcados como <b className='text-destructive'>Externos</b>?",
              answer:
                "Cualquier clip de audio que no contenga los términos <b className='text-primary'>Proyecto</b> o <b className='text-primary'>Biblioteca de Usuario</b> en sus rutas de archivo se marcan como <b className='text-destructive'>Externos</b>.",
              detail: "Este proceso se optimizará en el futuro.",
            },
            question4: {
              question: "¿Qué información obtendré de mis proyectos?",
              answer:
                "Podrás ver: <ul className='flex list-disc flex-col gap-3 px-6'> <li> Una lista de cada tipo de pista (Audio, MIDI, Grupo, Envío, Maestro) con un resumen de dispositivos y audios en ella. <div className='text-xs italic text-muted-foreground/70'> Consejo: pasa el mouse sobre el contador de Dispositivos y Audios para obtener detalles. </div> </li> <li> Un resumen de todos los dispositivos <b className='text-destructive'>Externos</b> (VST, VST3 o M4L) utilizados. </li> <li> Un resumen de todos los Clips de Audio, marcando cualquier Clip <b className='text-destructive'>Externo</b>. <div className='text-xs italic text-muted-foreground/70'> Consejo: pasa el mouse sobre la ruta del Clip de Audio para obtener el directorio completo. </div> </li> </ul>",
            },
            contribute: {
              title: "¿Tienes algún comentario o sugerencia?",
              description:
                "Siéntete libre de crear un problema en el <a href='https://github.com/pablo-kitz/als-analysis' className='font-bold hover:underline' > Repositorio en Github </a> o <a href='https://www.instagram.com/pablokitz/' className='font-bold  hover:underline' > contáctame </a> .",
            },
          },
          toast: {
            invalidFile: {
              title: "Tipo de archivo no válido",
              description: "Solo se permiten archivos .als.",
            },
            genericError: {
              title: "Error",
              description:
                "Ha ocurrido un error, por favor, verifica la consola.",
            },
          },
          fileInput: {
            description:
              "<b>Haz clic</b> o <b>arrastra y suelta</b> para subir tu archivo .als",
          },
          reportLine: {
            tracks: {
              title: "Pistas",
              column1: "Nombre de la Pista",
              column2: "Tipo de Pista",
              column3: "Dispositivos de la Pista - Audios",
            },
            devices: {
              title: "Dispositivos",
              column1: "Nombre del Dispositivo",
              column2: "Tipo de Dispositivo",
              column3: "Ubicación del Dispositivo",
            },
            audios: {
              title: "Audios",
              column1: "Nombre del Audio",
              column2: "Vista de Ubicación del Audio",
              column3: "Ubicación del Archivo de Audio",
            },
          },
          footer: {
            createdBy: "Creado por",
          },
        },
      },
    },
  });

export default i18n;
