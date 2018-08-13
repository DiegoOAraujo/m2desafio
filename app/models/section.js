module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
  }, {
    getterMethods: {
      excerpt() {
        return this.content.length > 120
          ? `${this.content.substring(0, this.content.lastIndexOf(' ', 120))} ...`
          : this.content;
      },
    },
  });

  Section.associate = (models) => {
    Section.belongsTo(models.Project);
  };
  return Section;
};
