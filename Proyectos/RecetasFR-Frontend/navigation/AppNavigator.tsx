// navigation/AppNavigator.tsx
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../context/AuthContext';
import { Colors } from '../styles/colors';
import { Platform } from 'react-native';

// Importación de pantallas
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import SuggestionScreen from '../screens/user/SuggestionScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import DraftsScreen from '../screens/empleado/DraftsScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ReviewDraftsScreen from '../screens/admin/ReviewDraftsScreen';
import SuggestionsReviewScreen from '../screens/empleado/SuggestionsReviewScreen';
import EditRecipeScreen from '../screens/empleado/EditRecipeScreen';
import AdminSuggestionPanel from '../screens/admin/AdminSuggestionPanel';

// Componente visual del logo en el header
import LogoHeader from '../components/LogoHeader';  

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación por pestañas (parte inferior de la app)
// Muestra diferentes pestañas según el rol del usuario.
function MainTabs() {
  const { user } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerRight: () => <LogoHeader />,
        tabBarIcon: ({ focused, color, size }) => {
          // Icono dinámico según la pestaña activa
          let iconName: string;

          switch (route.name) {
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Buscar':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Sugerencias':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'Borradores':
              iconName = focused ? 'document' : 'document-outline';
              break;
            case 'Ver sugerencias':
              iconName = focused ? 'eye' : 'eye-outline';
              break;
            case 'Usuarios':
              iconName = focused ? 'people' : 'people-outline';
              break;
            case 'Revisar recetas':
              iconName = focused ? 'checkmark-circle' : 'checkmark-circle-outline';
              break;
            case 'Sugerencias Admin':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.green600,
        tabBarInactiveTintColor: Colors.gray900,
        tabBarStyle: {
          height: Platform.OS === 'android' ? 120 : 85,
          paddingBottom: 20, 
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontSize: 13
        }
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Buscar" component={SearchScreen} />

      {user?.rol === 'Usuario' && (
        <Tab.Screen name="Sugerencias" component={SuggestionScreen} />
      )}

      {user?.rol === 'Empleado' && (
        <>
          <Tab.Screen name="Borradores" component={DraftsScreen} />
          <Tab.Screen name="Ver sugerencias" component={SuggestionsReviewScreen} />
        </>
      )}

      {user?.rol === 'Administrador' && (
        <>
          <Tab.Screen name="Usuarios" component={AdminUsersScreen} />
          <Tab.Screen name="Revisar recetas" component={ReviewDraftsScreen} />
          <Tab.Screen name="Sugerencias Admin" component={AdminSuggestionPanel} />
        </>
      )}

      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navegador principal de la app:
// Muestra login/register si no hay usuario autenticado.
// Si hay usuario, muestra las pestañas principales y pantallas adicionales.
export default function AppNavigator() {
  const { user } = useContext(AuthContext);

   return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerRight: () => <LogoHeader /> }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerRight: () => <LogoHeader /> }}
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="RecetasFR" 
            component={MainTabs} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Detalle" 
            component={RecipeDetailScreen} 
            options={{ headerRight: () => <LogoHeader /> }}
          />
          <Stack.Screen 
            name="Editar receta" 
            component={EditRecipeScreen} 
            options={{ headerRight: () => <LogoHeader /> }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
