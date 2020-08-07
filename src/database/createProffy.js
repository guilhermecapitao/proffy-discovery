module.exports = async function(db, { proffyValue, classValue, classScheduleValues }) {

  // Inserir dados na tabela proffys
  const insertedProffy = await db.run(`
      INSERT INTO proffys (
        name,
        avatar,
        whatsapp,
        bio
      ) VALUES (
        "${proffyValue.name}",
        "${proffyValue.avatar}",
        "${proffyValue.whatsapp}",
        "${proffyValue.bio}"
      );
  `)

  const proffy_id = insertedProffy.lastID


  // Inserir dados na tabela classes
  const insertedClass = await db.run(`
      INSERT INTO classes (
        subject,
        cost,
        proffy_id
      ) VALUES (
        "${classValue.subject}",
        "${classValue.cost}",
        "${proffy_id}"
      );
  `)

  const class_id = insertedClass.lastID


  //Inserir dados na tabela class_schedule
  const insertedAllClassesScheduleValues = classScheduleValues.map((classScheduleValue) => {
    return db.run(`
      INSERT INTO class_schedule (
        class_id,
        weekday,
        time_from,
        time_to
      ) VALUES (
        "${class_id}",
        "${classScheduleValue.weekday}",
        "${classScheduleValue.time_from}",
        "${classScheduleValue.time_to}"
      );
    `)
  })

  await Promise.all(insertedAllClassesScheduleValues)
}