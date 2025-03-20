const admin = require("firebase-admin");

const registerUser = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;



  try {
    const user = await admin.auth().createUser({
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    });

    return res.status(201).json({ 
      message: "Usuário criado com sucesso", 
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      }
    });

  } catch (error) {
    let statusCode = 400;
    let errorMessage = error.message;

    switch (error.code) {
      case 'auth/email-already-exists':
      case 'auth/email-already-in-use':
        statusCode = 409; 
        errorMessage = "Este e-mail já está cadastrado. Utilize outro e-mail ou faça login.";
        break;
      
      case 'auth/invalid-email':
        errorMessage = "Formato de e-mail inválido";
        break;
      
      case 'auth/weak-password':
        errorMessage = "A senha deve ter no mínimo 6 caracteres";
        break;
      
      case 'auth/invalid-password':
        errorMessage = "Senha inválida. Utilize uma combinação mais segura";
        break;
      
      default:
        errorMessage = "Erro ao cadastrar usuário. Tente novamente mais tarde.";
        break;
    }

    return res.status(statusCode).json({ error: errorMessage });
  }
};

module.exports = { registerUser };