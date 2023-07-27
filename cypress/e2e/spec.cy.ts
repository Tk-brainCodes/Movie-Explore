/// <reference types="cypress" />
import nowShowingMoviesData from "../fixtures/nowShowingMoviesData.json";
import popularMoviesData from "../fixtures/popularMoviesData.json";
import trendingMoviesData from "../fixtures/trendingMoviesData.json";
import user from '../fixtures/user.json'

describe("It loads the Home Page properly", () => {
  beforeEach(() => {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/now_playing*", {
      body: nowShowingMoviesData,
    }).as("nowShowingData");

    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular*", {
      body: popularMoviesData, 
    }).as("popularMoviesData");

    cy.intercept("GET", "https://api.themoviedb.org/3/trending/all/day*", {
      body: trendingMoviesData, 
    }).as("trendingMoviesData");

    cy.visit("http://localhost:3000");
    cy.wait(["@nowShowingData", "@popularMoviesData", "@trendingMoviesData"]);
  });

  it("should display trending movies", () => {
    cy.contains("Trending Movies");
    cy.get("[data-cy='trending-movies']").should("be.visible");
  });

  it("should display popular movies", () => {
    cy.contains("Popular Movies");
    cy.get("[data-cy='popular-movies']").should("be.visible");
  });

  it("should display showing in theatres movies", () => {
    cy.contains("Showing in theatres");
    cy.get("[data-cy='showing-in-theatres']").should("be.visible");
  });

  it("should load data from the API", () => {
    cy.window().then((window) => {
      const trendingMoviesLocalStorage = JSON.parse(
        window.localStorage.getItem("trending") || "{}"
      );
      const nowShowingMoviesLocalStorage = JSON.parse(
        window.localStorage.getItem("nowShowing") || "{}"
      );
      const popularMoviesLocalStorage = JSON.parse(
        window.localStorage.getItem("popular") || "{}"
      );

      expect(trendingMoviesLocalStorage).to.have.property("results");
      expect(nowShowingMoviesLocalStorage).to.have.property("results");
      expect(popularMoviesLocalStorage).to.have.property("results");
    });
  });
});

const userDataFixture = "user.json";

describe("Functionalities in the top navigation works correctly", () => {
  beforeEach(() => {
    cy.fixture(userDataFixture).as("userData");
  });

it("should toggle the sidebar", () => {
  cy.visit("http://localhost:3000"); // Adjust the URL as needed
  cy.get("[data-cy='sidenav']").should("not.be.visible");
  cy.get("[data-cy='sidebar-toggle-button']").click();
  cy.get("[data-cy='sidenav']").should("be.visible");
  cy.get("[data-cy='sidebar-toggle-button']").click();
  cy.get("[data-cy='sidenav']").should("not.be.visible");
});

  it("should navigate to the search page when clicking on the search icon", () => {
    cy.visit("http://localhost:3000/search"); 
    cy.get("[data-cy='search-icon']").click();
    cy.url().should("include", "/search");
  });

  it("should open the modal when clicking on the login/logout button", () => {
    cy.visit("http://localhost:3000");
    cy.get("[data-cy='login-logout-button']").click();
    cy.get("[data-cy='modal']").should("be.visible");
  });

  it("should show user profile image and logout button when user is logged in", () => {
    cy.visit("http://localhost:3000", {
      onBeforeLoad(win) {
        cy.get("@userData").then((userData) => {
          win.localStorage.setItem("user", JSON.stringify(userData));
        });
      },
    });

    cy.get("[data-cy='user-profile-image']").should("be.visible");
    cy.get("[data-cy='user-profile-image']").click();
    cy.get("[data-cy='user-dropdown']").should("be.visible");
    cy.get("[data-cy='login-logout-button']").click();
    cy.get("[data-cy='login-logout-button']").should("contain.text", "Log in");
  });

  it("should show login button when user is logged out", () => {
    cy.visit("http://localhost:3000"); 
    cy.get("[data-cy='login-logout-button']").should("contain.text", "Log in");
    cy.get("[data-cy='login-logout-button']").click();
    cy.get("[data-cy='modal']").should("be.visible");
  });
});


const sidebarRoutesFixture = "sidebarRoutes.json"; 
describe("Sidenav Component", () => {
  beforeEach(() => {
    // Load the component's fixture data (if needed)
    cy.fixture(sidebarRoutesFixture).as("sidebarRoutes");
  });

  it("should toggle the sidenav and display links", () => {
    cy.visit("http://localhost:3000"); 
    cy.get("[data-cy='sidenav']").should("not.be.visible");
    cy.get("[data-cy='sidebar-toggle-button']").click();
    cy.get("[data-cy='sidenav']").should("be.visible");

       cy.get("@sidebarRoutes").then((sidebarRoutes) => {
         sidebarRoutes.each((route: any) => {
           cy.contains(route.name).should("be.visible");
           route.paths.forEach(({ title }: {title: string}) => {
             cy.contains(title).should("be.visible");
           });
         });
       });

    cy.get("[data-cy='sidebar-toggle-button']").click();
    cy.get("[data-cy='sidenav']").should("not.be.visible");
  });

  it("should display the bookmark length in the 'Bookmarked' link", () => {
    cy.visit("http://localhost:3000"); 
    cy.get("[data-cy='sidebar-toggle-button']").click();
    cy.get("[data-cy='sidenav']").should("be.visible");
    cy.contains("Bookmarked").should("be.visible");
    cy.get("[data-cy='bookmark-length']").then((bookmarkLengthEl) => {
      const bookmarkLength = Number(bookmarkLengthEl.text());
      cy.wrap(bookmarkLength).should("be.a", "number").and("be.gte", 0);
    });
    cy.get("[data-cy='sidebar-toggle-button']").click();
    cy.get("[data-cy='sidenav']").should("not.be.visible");
  });
});
