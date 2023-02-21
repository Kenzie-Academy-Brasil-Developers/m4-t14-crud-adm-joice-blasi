import app from './app';
import connectDatabase from './database/connection';

app.listen(3000, async () => {
    await connectDatabase();
    console.log('Server is running!');
});