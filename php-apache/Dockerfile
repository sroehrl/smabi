FROM php:8.0.8-apache
RUN docker-php-ext-install  mysqli
RUN a2enmod rewrite
RUN apache2ctl restart
RUN buildDeps=" \
        wget \
        git \
        ssh \
        zip \
    "; \
    set -x \
    && apt-get update && apt-get install -y $buildDeps --no-install-recommends && rm -rf /var/lib/apt/lists/*
RUN wget https://getcomposer.org/installer -O - -q | php -- --quiet && \
    mv composer.phar /usr/local/bin/composer
RUN composer global require neoan3/neoan3 --ignore-platform-reqs
ENV PATH /root/.composer/vendor/bin:$PATH
WORKDIR /var/www/app
RUN neoan3 new app